import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/Layout'
import Slices from '../components/Slices'
import { getAllPagesWithSlug, getPageBySlug } from '../lib/api'

export default function Page({ page, header, preview }) {
  const router = useRouter()
  if (!router.isFallback && !page?._meta?.id) {
    return <ErrorPage statusCode={404} />
  }

  const metadata = {
    meta_title: page?.meta_title,
    meta_description: page?.meta_description,
    meta_image: page?.meta_image,
  }

  return (
    <Layout preview={preview} metadata={metadata} header={header}>
      {router.isFallback ? <div>Loading…</div> : <Slices slices={page?.body} />}
    </Layout>
  )
}

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
