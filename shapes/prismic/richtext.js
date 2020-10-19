import PropTypes from 'prop-types'

const prismicRichTextShare = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
    spans: PropTypes.arrayOf(
      PropTypes.shape({
        end: PropTypes.number,
        start: PropTypes.number,
        type: PropTypes.string,
      })
    ),
  })
)

export default prismicRichTextShare
