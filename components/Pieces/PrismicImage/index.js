import NextImage from 'next/image'
import PropTypes from 'prop-types'
import prismicImageShape from 'shapes/prismic/image'

const PrismicImage = ({ image, layout = 'intrinsic', objectFit = 'cover' }) => {
  return image?.url ? (
    <NextImage
      src={image.url}
      alt={image.alt}
      {...(image.dimensions || {})}
      layout={layout}
      objectFit={objectFit}
    />
  ) : null
}

PrismicImage.propTypes = {
  image: prismicImageShape,
  layout: PropTypes.oneOf(['fixed', 'intrinsic', 'responsive', 'fill']),
  objectFit: PropTypes.oneOf([
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
  ]),
}

export default PrismicImage
