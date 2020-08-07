import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/index.css'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import NProgress from 'nprogress'
import Router from 'next/router'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default MyApp
