import * as prismic from '@prismicio/client'

const REPOSITORY = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME

export const api = {
  ENDPOINT: prismic.getEndpoint(REPOSITORY),
  HOME_ID: process.env.NEXT_PUBLIC_PRISMIC_HOME_ID,
  TOKEN: process.env.PRISMIC_API_TOKEN,
  LOCALE: process.env.PRISMIC_REPOSITORY_LOCALE,
}

export const PrismicClient = prismic.createClient(api.ENDPOINT, {
  accessToken: api.TOKEN,
})
