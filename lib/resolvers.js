export function linkResolver(doc) {
  // Pretty URLs for known types
  if (doc && doc.type === 'page' && doc.data) {
    return doc?.data?.slug
  }

  return `/`
}
