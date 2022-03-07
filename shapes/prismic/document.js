import PropTypes from 'prop-types'

const prismicDocumentShape = PropTypes.shape({
  id: PropTypes.string,
  uid: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.object,
})

export default prismicDocumentShape
