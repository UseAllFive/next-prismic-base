// TODO: update metadata defaults
export const metaDefaults = {
  TWITTER_HANDLE: '{@twitterHandle}',
  TITLE: '{Default Title}',
  DESCRIPTION: '{Default description}',
  IMAGE: '{path_to_share_image.jpg}',
}

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
export const api = {
  REF_URL: `https://${REPOSITORY}.prismic.io/api/v2`,
  GRAPHQL_URL: `https://${REPOSITORY}.prismic.io/graphql`,
  HEADER_ID: process.env.PRISMIC_HEADER_ID,
  TOKEN: process.env.PRISMIC_API_TOKEN,
  LOCALE: process.env.PRISMIC_REPOSITORY_LOCALE,
}
