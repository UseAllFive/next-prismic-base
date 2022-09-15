import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/fonts.css'
import '../styles/global.scss'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import * as analytics from 'lib/analytics'
import { useEffect } from 'react'

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start()
    const handleRouteChangeComplete = (url) => {
      NProgress.done()
      // Artificial delay to ensure accurate page title data flows into analytics service
      setTimeout(() => analytics.pageview(url), 1000)
    }
    const handleRouteChangeError = () => NProgress.done()

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router])

  return <Component {...pageProps} key={router.asPath} />
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
  router: PropTypes.any,
}

export default MyApp
