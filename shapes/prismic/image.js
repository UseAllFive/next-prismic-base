import PropTypes from 'prop-types'

const prismicImageShape = PropTypes.shape({
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  copyright: PropTypes.string,
  url: PropTypes.string,
  alt: PropTypes.string,
})

export default prismicImageShape
