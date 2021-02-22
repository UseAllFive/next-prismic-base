/*
  Page slugs can be handled in prismic with two fields:
  1. Page Slug. This is a non-unique string field that is expected to have no spaces or special charaters
  2. Parent Page. A content relationship field to inherit a parent page in the url formation. A Parent Page can have its own parent page defined, which would be included in the url

  You only need to attach a single parent page, and the page will iterate through all parent pages to form the slug:
  /parent-pages-parent-slug/parent-page/page-slug

  Because content relationships in Prismic are limited to one-level deep, we need to query for each parent page
*/

import { PrismicClient } from 'lib/api'

async function handleParentPage(data) {
  // fetchLinks only brings back content relationship to second-level.
  // So each nested parent page will require an additional api call
  const parent = data?.parent_page
  if (parent?.id) {
    const page = await PrismicClient.getByID(parent.id, {
      fetchLinks: ['page.page_slug', 'page.parent_page'],
    })

    return page?.data
  }
  return parent?.data
}

export async function getPageSlug(page) {
  const slug = [page?.data?.page_slug]

  // Go through and add in parent page slug
  let parentPage = await handleParentPage(page?.data)

  if (parentPage) {
    let moreParentPages = true

    while (moreParentPages) {
      const parentPageSlug = parentPage?.page_slug

      if (parentPageSlug) {
        slug.push(parentPageSlug)
      }

      // Check if there are more parent parents
      parentPage = await handleParentPage(parentPage)

      if (!parentPage) {
        moreParentPages = false
      }
    }
  }

  return slug.reverse()
}
