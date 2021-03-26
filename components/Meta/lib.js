export function getMetaData(doc) {
  // Determine template overrides
  const metadata = {
    meta_title: null,
    meta_divider: null,
    meta_description: null,
    meta_image: null,
  }

  if (!doc || !doc.data) return metadata

  // Every template in Prismic should have these override options (TODO ensure exact naming in your project)
  // And then each template may have specifics for determining default metadata fields if these overrides are left blank
  const { meta_title, meta_description, meta_image } = doc.data

  switch (doc.type) {
    case 'blog_post':
      // TODO remove this and add in your own template override options
      metadata.meta_title = meta_title || doc.data.post_title
      metadata.meta_description = meta_description || doc.data.post_description
      metadata.meta_image = meta_image?.url || doc.data.post_image

      break
    default:
      metadata.meta_title = meta_title
      metadata.meta_description = meta_description
      metadata.meta_image = meta_image?.url

      break
  }

  return metadata
}
