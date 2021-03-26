import PropTypes from 'prop-types'
import prismicLinkShape from 'shapes/prismic/link'

const headerShape = PropTypes.shape({
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: prismicLinkShape,
      link_text: PropTypes.string,
    })
  ),
})

export default headerShape
