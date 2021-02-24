import { api } from 'lib/api'

export const homeID = api.HOME_ID

export const pageSlugFetchlinks = ['page.page_slug', 'page.parent_pages']

// TODO continue to add in fetch links as needed for slices and page content here
export const pageFetchLinks = [...pageSlugFetchlinks]
