import PropTypes from 'prop-types'
import ErrorPage from 'next/error'
import Layout from 'components/Layout/_Layout'
import Slices from 'components/Slices/_Slices'
import headerShape from 'components/Layout/Header/shape'
import { useRouter } from 'next/router'
import pageShape from './shape'
import { getMetaData } from 'components/Meta/lib'

const Page = ({ page, header, preview }) => {
  const router = useRouter()
  if (!router.isFallback && !page?.id) {
    return <ErrorPage statusCode={404} />
  }

  // Set page metadata
  const metadata = getMetaData(page)

  return (
    <Layout preview={preview} metadata={metadata} header={header}>
      {page?.data?.body && <Slices slices={page?.data?.body} />}
    </Layout>
  )
}

Page.propTypes = {
  page: pageShape,
  header: headerShape,
  preview: PropTypes.bool,
}

export default Page
