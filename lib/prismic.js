import * as prismic from '@prismicio/client'
import PRISMIC_TYPES from '../types'

const REPOSITORY = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME

export const api = {
  ENDPOINT: prismic.getEndpoint(REPOSITORY),
  HOME_ID: process.env.NEXT_PUBLIC_PRISMIC_HOME_ID,
  TOKEN: process.env.PRISMIC_API_TOKEN,
  LOCALE: process.env.PRISMIC_REPOSITORY_LOCALE,
}

export const client = prismic.createClient(api.ENDPOINT, {
  accessToken: api.TOKEN,
})

// Derived fetchlinks
const IGNORE_FIELDS = ['uid', 'body']
// TODO: refine, ignore [embed, geopoint, link, link to media, rich text]
// https://prismic.io/docs/technologies/fetch-linked-document-fields-rest-api
const IGNORE_TYPES = []

export const createFetchLinks = (name, type) =>
  Object.entries(type.Main)
    .filter(
      ([field, { type }]) =>
        !IGNORE_FIELDS.includes(field) && !IGNORE_TYPES.includes(type)
    )
    .map(([field]) => `${name}.${field}`)

export const ALL_FETCH_LINKS = Object.entries(PRISMIC_TYPES).reduce(
  (acc, [name, type]) => [...acc, ...createFetchLinks(name, type)],
  []
)
