import PropTypes from 'prop-types'
import ErrorPage from 'next/error'
import Layout from 'components/Layout'
import Slices from 'components/Slices'
import HEADER_SHAPE from 'components/Header/shape'
import { META_PROPS } from 'components/Meta/shape'
import { useRouter } from 'next/router'

const Page = ({ page, header, preview }) => {
  const router = useRouter()
  if (!router.isFallback && !page?._meta?.id) {
    return <ErrorPage statusCode={404} />
  }

  const metadata = {
    /* eslint-disable react/prop-types */
    meta_title: page?.meta_title,
    meta_description: page?.meta_description,
    meta_image: page?.meta_image,
    /* eslint-enable */
  }

  return (
    <Layout preview={preview} metadata={metadata} header={header}>
      {page?.body && <Slices slices={page?.body} />}
    </Layout>
  )
}

Page.propTypes = {
  page: PropTypes.shape({
    body: PropTypes.array,
    slug: PropTypes.string,
    ...META_PROPS,
    _meta: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  header: HEADER_SHAPE,
  preview: PropTypes.bool,
}

export default Page
