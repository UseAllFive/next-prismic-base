import PreviewBar from '../PreviewBar'
import Footer from '../Footer'
import Header from '../Header'
import Meta from '../Meta'
import { motion } from 'framer-motion'

export default function Layout({ metadata, header, preview, children }) {
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
