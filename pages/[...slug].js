import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import Page from 'components/Page'
import { getPaths } from 'lib/pathFormation'
import { homeID, pageFetchLinks } from 'constants/page'
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
    }
  )

  // Prismic only allows goes one-level deep with content relationships, so we need to perform additional look ups for nested pages
  // Go through results if there are parent pages
  let filteredPage = null
  if (results && results.length) {
    const curSlug = slugArray.join('/')
    const resolvedPages = await Promise.all(
      results.map(async (result) => {
        // Determine result's full slug based on parent pages
        const resultParentPages = await getPageSlug(result)

        // Compare the result's parent slugs to the actual url
        const isMatch = resultParentPages.join('/') === curSlug
        return isMatch ? result : null
      })
    )

    filteredPage = resolvedPages.find((page) => page !== null)
  }

  const page = filteredPage

  // Get global layout items
  const { data: header } = await PrismicClient.getSingle('header', {
    fetchLinks: ['page.page_slug', 'page.parent_page'],
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
  // TODO handle results exceeding 100
  const {
    results: allPages,
    total_pages: totalPages,
  } = await PrismicClient.query(
    Prismic.Predicates.at('document.type', 'page'),
    {
      pageSize: 100,
      fetchLinks: pageFetchLinks,
    }
  )

  // Form URLs based on slug + parent pages
  const filteredPages = allPages?.filter((page) => page?.id !== homeID) // remove home page from paths
  const paths = await getPaths({ pageType: 'page', pages: filteredPages })

  return {
    paths,
    fallback: true,
  }
}
