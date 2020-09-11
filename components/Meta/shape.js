import PropTypes from 'prop-types'
import PRISMIC_IMAGE_SHAPE from 'shapes/prismic/image'

const META_SHAPE = PropTypes.shape({
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  meta_image: PRISMIC_IMAGE_SHAPE,
})

export default META_SHAPE
