export function linkResolver(doc) {
  // Pretty URLs for known types
  if (doc?.type === 'page' || doc?.__typename === 'Page') {
    return doc?.slug || doc?.data?.slug
  }

  return `/`
}

export function hrefResolver(doc) {
  // Handle homepage, which sometimes comes in a '-' from prismic
  if (doc?.slug === '/') {
    return '/'
  }

  // Pretty URLs for known types
  if (doc?.__typename === 'Page') {
    return '[...slug]'
  }

  // Fallback for other types, in case new custom types get created
  return `/`
}
