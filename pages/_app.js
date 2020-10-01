import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/global.scss'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
  router: PropTypes.any,
}

export default MyApp
