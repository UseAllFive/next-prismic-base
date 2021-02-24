/* eslint-disable no-case-declarations */
import { getPageSlug } from './pageSlug'

export function linkResolver(doc) {
  let slug = '/'
  if (!doc) return slug

  // Add in template types as needed
  switch (doc.type) {
    case 'page':
      const slugArray = getPageSlug(doc)
      slug = '/' + slugArray.join('/')
      break

    default:
      return slug
  }

  return slug
}
