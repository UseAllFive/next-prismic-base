export function linkResolver(doc) {
  // Pretty URLs for known types
  if (doc?.type === 'page') {
    return doc?.data?.slug
  }

  return `/`
}

export function hrefResolver(doc) {
  // Handle homepage
  if (doc?.data.slug === '/') {
    return '/'
  }

  // Pretty URLs for known types
  if (doc?.type === 'page') {
    return '[...slug]'
  }

  // Fallback for other types, in case new custom types get created
  return `/`
}
