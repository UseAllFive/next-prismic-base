import { api } from 'lib/api'

export const homeID = api.HOME_ID

export const pageSlugFetchLinks = ['page.slug']

// TODO continue to add in fetch links as needed for slices and page content here
export const pageFetchLinks = [...pageSlugFetchLinks]
