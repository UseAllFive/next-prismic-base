import PreviewBar from './preview-bar'
import Footer from '../components/footer'
import Header from '../components/header'
import Meta from '../components/meta'
import { motion } from 'framer-motion'

export default function Layout({ metadata, preview, children }) {
  return (
    <>
      <Meta metadata={metadata} />
      {preview && <PreviewBar />}
      <Header />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <main>{children}</main>
      </motion.div>
      <Footer />
    </>
  )
}
