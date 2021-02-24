import Prismic from 'prismic-javascript'

const REPOSITORY = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME

export const api = {
  REF_URL: `https://${REPOSITORY}.prismic.io/api/v2`,
  HOME_ID: process.env.PRISMIC_HOME_ID,
  TOKEN: process.env.PRISMIC_API_TOKEN,
  LOCALE: process.env.PRISMIC_REPOSITORY_LOCALE,
}

export const PrismicClient = Prismic.client(api.REF_URL, {
  accessToken: api.TOKEN,
})
