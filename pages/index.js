// An index.js file is required for deploying w/ vercel

import ErrorPage from 'next/error'
import Layout from '../components/layout'
import Slices from '../components/slices'
import { getPageBySlug } from '../lib/api'

export default function Page({ page, header, preview }) {
  if (!page?._meta?.id) {
    return <ErrorPage statusCode={404} />
  }

  const metadata = {
    meta_title: page?.meta_title,
    meta_description: page?.meta_description,
    meta_image: page?.meta_image,
  }

  return (
    <Layout preview={preview} metadata={metadata} header={header}>
      <Slices slices={page?.body} />
    </Layout>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const { page, header } = await getPageBySlug('/', previewData)

  return {
    props: {
      preview,
      page: page?.node ?? null,
      header: header?.node ?? null,
    },
    revalidate: 1,
  }
}
