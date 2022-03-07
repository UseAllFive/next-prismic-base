import * as prismic from '@prismicio/client'
import { client } from 'lib/prismic'
import Page from 'components/Templates/Page'
import { getPagePaths } from 'lib/pathFormation'
import { homeID, pageFetchLinks, pageSlugFetchLinks } from 'constants/page'
import { getPageSlug } from 'lib/pageSlug'

export default Page

export async function getStaticProps({ params, preview = false, previewData }) {
  const masterRef = await client.getMasterRef()
  const ref = previewData?.ref || masterRef.ref

  // Get pages based on ending slug
  const slugArray = params.slug
  const slug = slugArray?.length ? slugArray[slugArray.length - 1] : 'home'
  let uidQuery
  let slugQuery
  try {
    uidQuery = await client.get({
      predicates: [prismic.predicate.at('my.page.uid', slug)],
      fetchLinks: pageFetchLinks,
      ref,
      pageSize: 1, // there can only be one with this uid
    })
  } catch (err) {
    uidQuery = { results: [] }
  }

  try {
    slugQuery = await client.get(
      // we're looking up all pages with a handle_override that matches this url's
      // later down in the code we check if the parent matches,
      // what this means:
      // we'll grab all pages that are called "about" in the override field
      // then later below, we only find the one that matches parent/about

      {
        predicates: [prismic.predicate.at('my.page.handle_override', slug)],
        fetchLinks: pageFetchLinks,
        ref,
        // page handle_override is a non-unique field, so we must find a bunch
        // this assumes there wont be 101+ pages with the same child slug name
        // meaning, you can't have 101 pages called about
        pageSize: 100,
      }
    )
  } catch (err) {
    slugQuery = { results: [] }
  }
  const results = uidQuery.results.concat(slugQuery.results)

  // Go through results if there are parent pages
  let page = null
  if (results && results.length) {
    const curSlug = slugArray.join('/')
    const resolvedPage = results.find((result) => {
      // Determine result's full slug based on parent pages
      const resultParentPages = getPageSlug(result)

      // Compare the result's parent slugs to the actual url
      const isMatch = resultParentPages.join('/') === curSlug
      return isMatch ? result : null
    })

    page = resolvedPage
  }
  if (!page) {
    return {
      notFound: true,
    }
  }

  // Get global layout items
  const { data: header } = await client.getSingle('header', {
    fetchLinks: pageSlugFetchLinks,
    ref,
  })

  return {
    props: {
      preview,
      page: page ?? null,
      header: header ?? null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const paths = await getPagePaths({ pageType: 'page', excludeId: homeID })

  return {
    paths,
    fallback: true,
  }
}
