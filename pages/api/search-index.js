import { client } from 'lib/prismic'
import { pageSlugFetchLinks } from 'constants/page'
import { linkResolver } from 'lib/resolvers'
import * as prismic from '@prismicio/client'
import * as moment from 'moment-timezone'

/**
 * This endpoint is just for testing your data
 * Modify pageToIndex() to match your data's fields
 */
export default async function searchIndex(_, res) {
  // Feel free to adjust this, doesn't affect indexing
  let offset = moment().add(-2, 'hours').valueOf()
  const index = await getPagesToIndex(offset)
  return res.status(200).json(index)
}

// This function is read hourly to index new changes.
// It only adds up to 100 pages at once, so if you
// bulk add, you'll need to modify this to index all the items
export async function getPagesToIndex(offset) {
  const masterRef = await client.getMasterRef()
  const ref = masterRef.ref

  let today = offset || moment().add(-1.5, 'hours').valueOf()

  const pages = await client.getAllByType('page', {
    ref,
    fetchLinks: pageSlugFetchLinks,
    predicates: [
      prismic.Predicates.dateAfter('document.last_publication_date', today),
    ],
  })
  let index = []
  pages.forEach((page) => {
    const sampleIndex = pageToIndex(page)
    index.push(sampleIndex)
  })

  return index
}

export function pageToIndex(page) {
  const sampleIndex = {
    type: 'add',
    id: page.id,
    fields: {
      // Map the page fields here to your CloudSearch
      title: page?.data?.title,
      url: linkResolver(page),
      body: page?.data?.body
        ?.map((body) => {
          let text

          if (body?.primary?.richtext) {
            body?.primary?.richtext.forEach((rt) => {
              if (text === undefined) {
                text = ''
              }
              if (rt.text !== undefined) {
                text += rt.text + ' '
              }
            })
          }
          return text
        })
        .filter(function (el) {
          return el !== undefined
        }),
      category: page?.data?.categories
        ?.map((cat) => {
          if (cat?.category) {
            return cat?.category?.data?.title
          }
        })
        .filter(function (el) {
          return el !== undefined
        }),
      category_handle: page?.data?.categories
        ?.map((cat) => {
          if (cat?.category) {
            return cat?.category?.uid
          }
        })
        .filter(function (el) {
          return el !== undefined
        }),
      category_id: page?.data?.categories
        ?.map((cat) => {
          if (cat?.category) {
            return cat?.category?.id
          }
        })
        .filter(function (el) {
          return el !== undefined
        }),
    },
  }
  return sampleIndex
}
