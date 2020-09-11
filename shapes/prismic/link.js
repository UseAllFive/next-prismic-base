import PropTypes from 'prop-types'

const PRISMIC_LINK_SHAPE = PropTypes.shape({
  _linkType: PropTypes.oneOf(['Link.web', 'Link.document']).isRequired,
  __typename: PropTypes.string.isRequired,
  url: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  slug: PropTypes.string,
})

export default PRISMIC_LINK_SHAPE
