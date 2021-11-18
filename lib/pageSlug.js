/*
  Page slugs can be handled in prismic with two fields:
  1. Page Slug. This is a non-unique string field that is expected to have no spaces or special charaters
  2. Parent Pages. Group of content relationship fields used to combine page slugs
  Attach parent pages to form the slug:
  /first-parent-page-slug/second-parent-page-slug/page-slug
  Because content relationships in Prismic are limited to one-level deep, we need to use array of parent pages instead of a single parent page
*/
import { pageFetchLinks } from '../constants/page'
import { PrismicClient } from './api'
import asyncForEach from './asyncForEach'

export function getPageSlug(page) {
  const uid = getSlug(page)
  const { parent_pages } = page?.data || {}
  const slugs = [uid]

  // Copy parents so that we can reverse it without affecting the original
  const parentsCopy = parent_pages ? [...parent_pages] : null
  // Go through and add in parent page slug
  if (parentsCopy) {
    parentsCopy.reverse().forEach((item) => {
      if (item && item.parent_page) {
        const parentPageSlug = getSlug(item?.parent_page)
        if (parentPageSlug) {
          slugs.push(getSlug(item?.parent_page))
        }
      }
    })
  }
  const formattedSlug = slugs.reverse()
  return formattedSlug
}

export function getSlug(page) {
  let slug = page.uid || page?.data?.uid
  if (page?.data?.handle_override && page?.data?.handle_override !== '') {
    slug = page?.data?.handle_override
  }
  if (typeof slug === 'undefined') {
    slug = page.slug
  }
  return slug
}

export async function fetchParentPageLinks(obj) {
  const docsToPopulate = []
  const docRecords = {}

  const fetchLinks = [...micrositeFetchLinks, ...pageFetchLinks]

  const traverse = function (o, fn, scope = {}, position = 0) {
    // eslint-disable-next-line guard-for-in
    for (const i in o) {
      fn.apply(this, [i, o[i], scope, position])
      if (o[i] !== null && typeof o[i] === 'object') {
        position++
        scope[position] = o[i]
        traverse(o[i], fn, scope, position)
      }
    }
  }

  // Loop through every property and check if parent_pages is populated
  traverse(obj, (key, value, scope, position) => {
    if (key === 'parent_pages') {
      if (value && value.length > 0) {
        if (value[0].parent_page && typeof value[0].parent_page === 'string') {
          // We found a parent_page that's just a reference
          docsToPopulate.push(scope[position - 2])
        } else if (typeof value[0].parent_page.id === 'string') {
          // Gotta go up three to populate if we're this deep
          docsToPopulate.push(scope[position - 3])
        }
      }
    }
  })

  await asyncForEach(docsToPopulate, async (doc) => {
    let newDoc
    if (!doc.id) {
      return
    }
    if (docRecords[doc.id]) {
      newDoc = docRecords[doc.id]
    } else {
      // only look up this record once
      newDoc = docRecords[doc.id] = await PrismicClient.getByID(doc.id, {
        fetchLinks,
      })
    }
    if (!doc.data) {
      doc.data = {}
    }
    doc.data.parent_pages = newDoc.data.parent_pages ?? null
  })
  return obj
}
