import PropTypes from 'prop-types'

const prismicLinkShape = PropTypes.shape({
  link_type: PropTypes.oneOf(['Web', 'Document']).isRequired,
  url: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  slug: PropTypes.string,
})

export default prismicLinkShape
