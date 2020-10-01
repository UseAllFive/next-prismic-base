import PropTypes from 'prop-types'

const PRISMIC_IMAGE_SHAPE = PropTypes.shape({
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  copyright: PropTypes.string,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
})

export default PRISMIC_IMAGE_SHAPE
