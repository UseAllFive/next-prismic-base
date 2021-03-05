import PropTypes from 'prop-types'
import prismicImageShape from 'shapes/prismic/image'

const metaProps = {
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  meta_image: PropTypes.oneOfType[(PropTypes.string, prismicImageShape)],
}

export { metaProps }

const metaShape = PropTypes.shape(metaProps)

export default metaShape
