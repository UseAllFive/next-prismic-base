import Head from 'next/head'
import { DEFAULT_OG_IMAGE_URL, DEFAULT_META_TITLE, DEFAULT_META_DESCRIPTION } from '../lib/constants'

export default function Meta({ metadata }) {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={metadata?.meta_description || DEFAULT_META_DESCRIPTION} />
      <meta property="og:image" content={metadata?.meta_image?.url || DEFAULT_OG_IMAGE_URL} />
      <title>{metadata?.meta_title || DEFAULT_META_TITLE}</title>
    </Head>
  )
}
