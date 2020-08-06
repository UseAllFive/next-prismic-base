import PreviewBar from './preview-bar'
import Footer from '../components/footer'
import Header from '../components/header'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Header />
      <div>
        {preview && <PreviewBar />}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
