import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import Page from 'components/Page'
import { getAllPaths } from 'lib/pathFormation'
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
  const paths = await getAllPaths({ pageType: 'page', excludeId: homeID })

  return {
    paths,
    fallback: true,
  }
}
