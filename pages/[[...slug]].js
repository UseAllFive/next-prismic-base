import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { getAllPagesWithSlug, getPageBySlug } from '../lib/api'

export default function Page({ page, preview }) {
  const router = useRouter()
  if (!router.isFallback && !page?._meta?.id) {
    return <ErrorPage statusCode={404} />
  }

  return <Layout preview={preview}>{router.isFallback ? <div>Loading…</div> : <>{page.meta_title}</>}</Layout>
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const slug = params.slug?.length ? `/${params.slug.join('/')}/` : '/'
  const data = await getPageBySlug(slug, previewData)

  return {
    props: {
      preview,
      page: data?.node ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug()
  const paths = allPages?.map(({ node }) => ({
    params: { slug: node.slug.split('/').filter((path) => path !== '') },
  }))

  return {
    paths,
    fallback: true,
  }
}
