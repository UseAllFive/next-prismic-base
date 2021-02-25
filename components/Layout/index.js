import PropTypes from 'prop-types'
import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Header from '../Header'
import Meta from '../Meta'
import { motion } from 'framer-motion'
import headerShape from 'components/Header/shape'
import metaShape from 'components/Meta/shape'
import { GlobalWrapper } from './global'

const Layout = ({ metadata, header, preview, children }) => {
  return (
    <GlobalWrapper todoData={'TODO this is a global string'}>
      <Meta metadata={metadata} />
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
    </GlobalWrapper>
  )
}

Layout.propTypes = {
  metadata: metaShape,
  header: headerShape,
  preview: PropTypes.bool,
  children: PropTypes.node,
}

export default Layout
