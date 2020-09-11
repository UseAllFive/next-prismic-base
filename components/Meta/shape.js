import PropTypes from 'prop-types'
import PRISMIC_IMAGE_SHAPE from 'shapes/prismic/image'

const META_PROPS = {
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  meta_image: PRISMIC_IMAGE_SHAPE,
}

export { META_PROPS }

const META_SHAPE = PropTypes.shape(META_PROPS)

export default META_SHAPE
