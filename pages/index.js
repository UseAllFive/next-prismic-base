import ErrorPage from 'next/error'
import Layout from '../components/layout'
import Slices from '../components/slices'
import { getPageBySlug } from '../lib/api'

export default function Page({ page, preview }) {
  if (!page?._meta?.id) {
    return <ErrorPage statusCode={404} />
  }

  const metadata = {
    meta_title: page?.meta_title,
    meta_description: page?.meta_description,
    meta_image: page?.meta_image,
  }

  return (
    <Layout preview={preview} metadata={metadata}>
      <Slices slices={page?.body} />
    </Layout>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const data = await getPageBySlug('/', previewData)

  return {
    props: {
      preview,
      page: data?.node ?? null,
    },
    revalidate: 1,
  }
}
