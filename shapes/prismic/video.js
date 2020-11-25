import PropTypes from 'prop-types'

const prismicVideoShape = PropTypes.shape({
  link_type: PropTypes.oneOf(['Media']),
  name: PropTypes.string,
  kind: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.string,
})

export default prismicVideoShape
