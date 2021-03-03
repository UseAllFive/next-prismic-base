import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import { pageFetchLinks } from 'constants/page'

/*
  Used to create list of page paths as needed for getStaticPaths in templates
*/
export async function getPagePaths({ pageType = 'page', excludeId }) {
  // Paginate through results
  const pageSize = 100 // max page size
  let curPage = 1
  let morePages = true
  let allPages = []

  while (morePages) {
    const {
      results,
      total_pages: totalPages,
      page,
    } = await PrismicClient.query(
      Prismic.Predicates.at('document.type', pageType),
      {
        pageSize,
        page: curPage,
        fetchLinks: pageFetchLinks,
      }
    )

    // Add results to all results array
    allPages = allPages.concat(results)

    // Determine if there are more pages to query
    if (totalPages === page) {
      morePages = false
    } else {
      curPage++
    }
  }

  let filteredResults = [...allPages]

  // Remove ID from results if applicable
  if (excludeId) {
    filteredResults = filteredResults.filter(
      (result) => result?.id !== excludeId
    )
  }

  // Form paths based on page type
  const paths = []

  filteredResults.forEach((page) => {
    let slug

    switch (pageType) {
      case 'page':
        // remove leading and trailing slash and convert slug into an array
        slug = page.data.slug.replace(/^\/|\/$/g, '').split('/')
        paths.push({ params: { slug: slug } })
        break
      // TODO add page types specific to your project
      case 'post':
        slug = `/posts/${page.uid}`
        // TODO push into paths
        break
      default:
        break
    }
  })

  return paths
}
