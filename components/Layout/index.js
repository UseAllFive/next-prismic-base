import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Header from '../Header'
import Meta from '../Meta'
import { motion } from 'framer-motion'
import HEADER_SHAPE from 'components/Header/shape'
import META_SHAPE from 'components/Meta/shape'

const Layout = ({ metadata, header, preview, children }) => {
  return (
    <>
      <Meta metadata={metadata} />
      {preview && <PreviewBar />}
      <Header header={header} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <main>{children}</main>
      </motion.div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  metadata: META_SHAPE,
  header: HEADER_SHAPE,
  preview: PropTypes.bool,
  children: PropTypes.node,
}

export default Layout
