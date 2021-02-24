/*
  Used to create list of paths as needed for getStaticPaths in templates
*/

import Prismic from 'prismic-javascript'
import { PrismicClient } from 'lib/api'
import { getPageSlug } from './pageSlug'
import { pageFetchLinks } from 'constants/page'

// async function getPaths({ pageType, pages }) {
//   const asyncForEach = async (array, callback) => {
//     for (let index = 0; index < array.length; index++) {
//       await callback(array[index], index, array)
//     }
//   }

//   const paths = []

//   const makePaths = async () => {
//     await asyncForEach(pages, async (page) => {
//       let slug

//       switch (pageType) {
//         case 'page':
//           slug = getPageSlug(page)
//           break
//         case 'blog_post':
//           slug = `/posts/${page.uid}`
//           break
//         default:
//           break
//       }

//       if (slug) {
//         paths.push({ params: { slug: slug } })
//       }
//     })
//   }

//   await makePaths()

//   return paths
// }

function getPaths({ pageType, pages }) {
  const paths = []

  pages.forEach((page) => {
    let slug

    switch (pageType) {
      case 'page':
        slug = getPageSlug(page)
        break
      case 'blog_post':
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

export async function getAllPaths({ pageType, excludeId }) {
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
    filteredResults = allPages?.filter((result) => result?.id !== excludeId) // remove home page from paths
  }

  // Form URLs based on slug + parent pages
  const paths = await getPaths({ pageType: pageType, pages: filteredResults })

  return paths
}
