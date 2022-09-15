import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Header from '../Header'
import Meta from '../Meta'
import headerShape from 'components/Layout/Header/shape'
import metaShape from 'components/Layout/Meta/shape'
import SkipToMain from 'components/Layout/SkipToMain'

const Layout = ({ metadata, header, preview, children }) => {
  return (
    <>
      {/* TODO create defaults in Prismic singleton */}
      <Meta metadata={metadata} defaults={null} />
      {preview && <PreviewBar />}
      <SkipToMain />
      <Header header={header} />
      <main id="root" role="main">
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  metadata: metaShape,
  header: headerShape,
  preview: PropTypes.bool,
  children: PropTypes.node,
}

export default Layout
