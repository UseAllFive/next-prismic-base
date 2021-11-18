import { getPageSlug } from './pageSlug'

export function linkResolver(doc) {
  let slug = '/'
  if (!doc) return slug

  // Override the homepage route with '/'
  if (doc.id === process.env.NEXT_PUBLIC_PRISMIC_HOME_ID) {
    return '/'
  }

  // Add in template types as needed
  switch (doc?.type) {
    case 'page':
      const slugArray = getPageSlug(doc)
      slug = '/' + slugArray.join('/')
      break
    default:
      return slug
  }

  return slug
}
