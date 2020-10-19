import PropTypes from 'prop-types'

const prismicImageShare = PropTypes.shape({
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  copyright: PropTypes.string,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
})

export default prismicImageShare
