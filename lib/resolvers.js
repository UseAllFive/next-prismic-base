export function linkResolver(doc) {
  let slug = '/'
  if (!doc) return slug

  // Add in template types as needed
  switch (doc?.type) {
    case 'page':
      slug = doc.data?.slug
      break

    default:
      return slug
  }

  return slug
}
