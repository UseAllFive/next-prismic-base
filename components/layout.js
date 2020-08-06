import PreviewBar from './preview-bar'
import Footer from '../components/footer'
import Header from '../components/header'
import Meta from '../components/meta'

export default function Layout({ metadata, preview, children }) {
  return (
    <>
      <Meta metadata={metadata} />
      {preview && <PreviewBar />}
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
