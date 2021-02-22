/*
  Used to create list of paths as needed for getStaticPaths in templates
*/

import { getPageSlug } from './pageSlug'

export async function getPaths({ pageType, pages }) {
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  const paths = []

  const makePaths = async () => {
    await asyncForEach(pages, async (page) => {
      let slug

      /* Add in additional layout types as needed for you project */
      switch (pageType) {
        case 'page':
          slug = await getPageSlug(page)
          break
        default:
          break
      }

      if (slug) {
        paths.push({ params: { slug: slug } })
      }
    })
  }

  await makePaths()

  return paths
}
