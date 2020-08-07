import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { getAllPagesWithSlug, getPageBySlug } from '../lib/api'

export default function Page({ page, preview }) {
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
    <Layout preview={preview} metadata={metadata}>
      {router.isFallback ? <div>Loading…</div> : <>Page content here</>}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const slug = params.slug?.length ? `/${params.slug.join('/')}/` : '/'
  const data = await getPageBySlug(slug, previewData)

  return {
    props: {
      preview,
      page: data?.node ?? null,
    },
    revalidate: 1,
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
