// An index.js file is required for deploying w/ vercel
import { getPageBySlug } from '../lib/api'
import Page from 'components/Page'

export default Page

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
