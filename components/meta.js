import Head from 'next/head'
import { DEFAULT_OG_IMAGE_URL, DEFAULT_META_TITLE, DEFAULT_META_DESCRIPTION, TWITTER_HANDLE } from '../lib/constants'

export default function Meta({ metadata }) {
  const title = metadata?.meta_title || DEFAULT_META_TITLE
  const description = metadata?.meta_description || DEFAULT_META_DESCRIPTION
  const image = metadata?.meta_image?.url || DEFAULT_OG_IMAGE_URL
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
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <title>{title}</title>
    </Head>
  )
}
