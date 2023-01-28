import { client } from 'lib/prismic'
import { pageSlugFetchLinks } from 'constants/page'

/**
 * Endpoint to query CloudSearch
 * and populate with Prismic documents
 */
export default async function search(req, res) {
  const q = req.query.q || ''
  const sort = req.query.sort ? `&sort=${req.query.sort}` : ''
  const size = req.query.size || 6
  const page = req.query.page || 0
  const start = page * size
  const masterRef = await client.getMasterRef()
  const ref = masterRef.ref

  // Query documentation starts here: https://docs.aws.amazon.com/cloudsearch/latest/developerguide/searching-compound-queries.html
  const response = await fetch(
    `https://search-prismic-zi3vcm5qxhe7ua7mhcd4neqequ.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?q.parser=structured&q=${q}&size=${size}${sort}&start=${start}`
  )

  const data = await response.json()
  let results = []

  // Get prismic IDs from search results
  if (data?.hits?.hit) {
    results = data?.hits?.hit?.map(({ id }) => {
      return id
    })
  }

  // Look up all IDs and get prismic docs
  const pages = await client.getAllByIDs(results, {
    ref,
    fetchLinks: pageSlugFetchLinks,
  })

  return res.status(200).json(pages)
}
