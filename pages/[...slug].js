import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import Page from 'components/Templates/Page'
import { getPagePaths } from 'lib/pathFormation'
import { homeID, pageFetchLinks, pageSlugFetchLinks } from 'constants/page'

export default Page

export async function getStaticProps({ params, preview = false, previewData }) {
  const { masterRef } = await PrismicClient.getApi()
  const ref = previewData?.ref || masterRef.ref

  const slug = params.slug.join('/')

  const { results } = await PrismicClient.query(
    Prismic.Predicates.fulltext('my.page.slug', slug),
    {
      fetchLinks: pageFetchLinks,
      ref,
    }
  )

  const page = results[0]

  // Get global layout items
  const { data: header } = await PrismicClient.getSingle('header', {
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
