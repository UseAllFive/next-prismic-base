import Prismic from 'prismic-javascript'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const HEADER_ID = process.env.PRISMIC_HEADER_ID
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
})

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(`${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`, {
    headers: {
      'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
      'Content-Type': 'application/json',
      'Accept-Language': API_LOCALE,
      Authorization: `Token ${API_TOKEN}`,
    },
  })

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
    {
      allPages {
        edges {
          node {
            slug
          }
        }
      }
    }  
  `)
  return data?.allPages?.edges
}

const HEADER_QUERY = `
  allHeaders(id: "${HEADER_ID}", lang: $lang) {
    edges {
      node {
        links {
          link {
            _linkType
            __typename
            ... on Page {
              slug
            }
            ... on _ExternalLink {
              url
              target
            }
          }
          link_text
        }
      }
    }
  }
`

export async function getPageBySlug(slug, previewData) {
  const data = await fetchAPI(
    `
    query PageBySlug($slug: String!, $lang: String!) {
      allPages(where: {slug: $slug}, lang: $lang) {
        edges {
          node {
            _meta {
              id
            }
            slug
            meta_title
            meta_image
            meta_description
            body {
              ... on PageBodyRichtext {
                type
                primary {
                  richtext
                }
              }
              ... on PageBodyCarousel {
                type
                fields {
                  image
                }
              }
              __typename
            }
          }
        }
      }
      ${HEADER_QUERY}         
    }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    }
  )

  return {
    page: data?.allPages?.edges[0],
    header: data?.allHeaders?.edges[0],
  }
}
