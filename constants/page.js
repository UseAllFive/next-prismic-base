import { api } from 'lib/prismic'

export const homeID = api.HOME_ID

export const pageSlugFetchLinks = [
  'page.uid',
  'page.handle_override',
  'page.title',
  'page.parent_pages',
]

// TODO continue to add in fetch links as needed for slices and page content here
export const pageFetchLinks = [...pageSlugFetchLinks]
