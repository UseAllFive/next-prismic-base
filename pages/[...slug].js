import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import Page from 'components/Page'

export default Page

export async function getStaticProps({ params, preview = false, previewData }) {
  const { masterRef } = await PrismicClient.getApi()
  const ref = previewData?.ref || masterRef.ref
  const slug = params.slug?.length ? `/${params.slug.join('/')}/` : '/'
  const { results } = await PrismicClient.query(
    Prismic.Predicates.at('my.page.slug', slug),
    {
      fetchLinks: ['page.slug'],
      ref,
    }
  )
  const { data: header } = await PrismicClient.getSingle('header', {
    fetchLinks: ['page.slug'],
    ref,
  })
  const page = results[0]

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
  const { results: allPages } = await PrismicClient.query(
    Prismic.Predicates.at('document.type', 'page')
  )
  const paths = allPages
    ?.filter((page) => page.data.slug !== '/')
    .map((page) => ({
      params: { slug: page.data.slug.split('/').filter((path) => path !== '') },
    }))

  return {
    paths,
    fallback: true,
  }
}
