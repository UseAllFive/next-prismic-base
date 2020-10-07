import Prismic from 'prismic-javascript'
import compress from 'graphql-query-compress'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const api = {
  REF_URL: `https://${REPOSITORY}.prismic.io/api/v2`,
  GRAPHQL_URL: `https://${REPOSITORY}.prismic.io/graphql`,
  HEADER_ID: process.env.PRISMIC_HEADER_ID,
  TOKEN: process.env.PRISMIC_API_TOKEN,
  LOCALE: process.env.PRISMIC_REPOSITORY_LOCALE,
}

export const PrismicClient = Prismic.client(api.REF_URL, {
  accessToken: api.TOKEN,
})

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(
    `${api.GRAPHQL_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': api.LOCALE,
        Authorization: `Token ${api.TOKEN}`,
      },
    }
  )

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
  allHeaders(id: "${api.HEADER_ID}", lang: $lang) {
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
    compress(`
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
  `),
    {
      previewData,
      variables: {
        slug,
        lang: api.LOCALE,
      },
    }
  )

  return {
    page: data?.allPages?.edges[0],
    header: data?.allHeaders?.edges[0],
  }
}
