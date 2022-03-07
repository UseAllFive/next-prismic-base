// An index.js file is required for deploying w/ vercel
import { client, api } from 'lib/prismic'
import Page from 'components/Templates/Page'
import { pageSlugFetchLinks } from 'constants/page'

export default Page

export async function getStaticProps({ preview = false, previewData }) {
  const masterRef = await client.getMasterRef()
  const ref = previewData?.ref || masterRef.ref
  const HOME_ID = api.HOME_ID
  const { data: header } = await client.getSingle('header', {
    fetchLinks: pageSlugFetchLinks,
    ref,
  })
  const page = await client.getByID(HOME_ID, { ref })

  return {
    props: {
      preview,
      page: page ?? null,
      header: header ?? null,
    },
    revalidate: 1,
  }
}
