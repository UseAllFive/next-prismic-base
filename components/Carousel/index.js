import Slider from 'react-slick'
import PropTypes from 'prop-types'
import prismicImageShare from 'shapes/prismic/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './index.module.scss'

const Carousel = ({ items }) => {
  const settings = {
    dots: true,
  }
  return (
    <Slider {...settings}>
      {items.map(({ image }, i) => {
        return (
          <div className={styles.carousel__slide} key={i}>
            <img
              className={styles.carousel__slide__image}
              src={image.url}
              alt={image.alt || ''}
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
      image: prismicImageShare,
    })
  ).isRequired,
}

export default Carousel
