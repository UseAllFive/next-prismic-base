export function linkResolver(doc) {
  // Pretty URLs for known types
  if (doc?.type === 'page') {
    return doc?.data?.slug
  }

  return `/`
}
