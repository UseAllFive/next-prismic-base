import PropTypes from 'prop-types'
import PRISMIC_LINK_SHAPE from 'shapes/prismic/link'

const HEADER_SHAPE = PropTypes.shape({
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PRISMIC_LINK_SHAPE,
      link_text: PropTypes.string,
    })
  ),
})

export default HEADER_SHAPE
