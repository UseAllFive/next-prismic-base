import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import { getPageSlug } from './pageSlug'
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

  // Remove ID from results if applicable
  let filteredResults = allPages
  if (excludeId) {
    filteredResults = allPages?.filter((result) => result?.id !== excludeId) // remove page from paths
  }

  // Form paths based on page type
  const paths = []

  filteredResults.forEach((page) => {
    let slug

    switch (pageType) {
      case 'page':
        slug = getPageSlug(page)
        break
      case 'post': // TODO add page types specific to your project
        slug = `/posts/${page.uid}`
        break
      default:
        break
    }

    if (slug) {
      paths.push({ params: { slug: slug } })
    }
  })

  return paths
}
