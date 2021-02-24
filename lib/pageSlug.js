/*
  Page slugs can be handled in prismic with two fields:
  1. Page Slug. This is a non-unique string field that is expected to have no spaces or special charaters
  2. Parent Pages. Group of content relationship fields used to combine page slugs

  Attach parent pages to form the slug:
  /first-parent-page-slug/second-parent-page-slug/page-slug

  Because content relationships in Prismic are limited to one-level deep, we need to query for each parent page
*/

export function getPageSlug(page) {
  const { page_slug, parent_pages } = page?.data || {}
  const slug = [page_slug]

  // Go through and add in parent page slug
  if (parent_pages) {
    parent_pages.reverse().forEach((item) => {
      const parentSlug = item?.parent_page?.data?.page_slug
      if (parentSlug) {
        slug.push(parentSlug)
      }
    })
  }

  return slug.reverse()
}
