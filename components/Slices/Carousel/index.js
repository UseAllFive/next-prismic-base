import Image from 'next/image'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import prismicImageShape from 'shapes/prismic/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = ({ items }) => {
  const settings = {
    arrows: false,
  }
  return (
    <Slider {...settings}>
      {items.map(({ image }, i) => {
        return (
          <div key={i}>
            <Image
              blurDataURL={`${image.url}?blur=200&px=16&auto=format`}
              placeholder="blur"
              src={image.url}
              width={image.dimensions.width}
              height={image.dimensions.height}
              alt={image.alt}
            />
          </div>
        )
      })}
    </Slider>
  )
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: prismicImageShape,
    })
  ).isRequired,
}

export default Carousel
