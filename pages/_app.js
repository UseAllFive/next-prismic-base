import 'normalize.css'
import 'nprogress/nprogress.css'
import '../styles/index.css'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import NProgress from 'nprogress'
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
