import PropTypes from 'prop-types'
import prismicImageShare from 'shapes/prismic/image'

const metaProps = {
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  meta_image: prismicImageShare,
}

export { metaProps }

const metaShape = PropTypes.shape(metaProps)

export default metaShape
