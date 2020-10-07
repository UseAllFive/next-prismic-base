import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/global.scss'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import { AnimatePresence } from 'framer-motion'
import * as analytics from 'lib/analytics'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (url) => {
  NProgress.done()
  // Artificial delay to ensure accurate page title data flows into analytics service
  setTimeout(() => analytics.pageview(url), 1000)
})
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps, router }) {
  return (
    // to remove page transitions, remove AnimatePresence wrapper and motion.div in Layout component
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
