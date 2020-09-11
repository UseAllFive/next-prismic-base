import { getAllPagesWithSlug, getPageBySlug } from '../lib/api'
import Page from 'components/Page'

export default Page

export async function getStaticProps({ params, preview = false, previewData }) {
  const slug = params.slug?.length ? `/${params.slug.join('/')}/` : '/'
  const { page, header } = await getPageBySlug(slug, previewData)

  return {
    props: {
      preview,
      page: page?.node ?? null,
      header: header?.node ?? null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug()
  const paths = allPages
    ?.filter(({ node }) => node.slug !== '/')
    .map(({ node }) => ({
      params: { slug: node.slug.split('/').filter((path) => path !== '') },
    }))

  return {
    paths,
    fallback: true,
  }
}
