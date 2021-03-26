import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Header from '../Header'
import Meta from '../Meta'
import { motion } from 'framer-motion'
import headerShape from 'components/Layout/Header/shape'
import metaShape from 'components/Layout/Meta/shape'

const Layout = ({ metadata, header, preview, children }) => {
  return (
    <>
      {/* TODO create defaults in Prismic singleton */}
      <Meta metadata={metadata} defaults={null} />
      {preview && <PreviewBar />}
      <Header header={header} />
      {/* TODO: customize your transition animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <main>{children}</main>
      </motion.div>
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
