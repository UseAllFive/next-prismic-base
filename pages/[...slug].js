import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import Page from 'components/Page'
import { getPagePaths } from 'lib/pathFormation'
import { homeID, pageFetchLinks, pageSlugFetchlinks } from 'constants/page'
import { getPageSlug } from 'lib/pageSlug'

export default Page

export async function getStaticProps({ params, preview = false, previewData }) {
  const { masterRef } = await PrismicClient.getApi()
  const ref = previewData?.ref || masterRef.ref

  // Get pages based on ending slug
  const slugArray = params.slug
  const slug = slugArray?.length ? slugArray[slugArray.length - 1] : 'home'

  const { results } = await PrismicClient.query(
    Prismic.Predicates.at('my.page.page_slug', slug),
    {
      fetchLinks: pageFetchLinks,
      ref,
      pageSize: 100, // page slug is a non-unique field
    }
  )

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

  // Get global layout items
  const { data: header } = await PrismicClient.getSingle('header', {
    fetchLinks: pageSlugFetchlinks,
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
