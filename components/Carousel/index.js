import Slider from 'react-slick'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import PRISMIC_IMAGE_SHAPE from 'shapes/prismic/image'

const Carousel = ({ items }) => {
  const settings = {
    dots: true,
  }
  return (
    <Slider {...settings}>
      {items.map(({ image }, i) => {
        return (
          <div key={i}>
            <img className={styles.image} src={image.url} alt={image.alt || ''} />
          </div>
        )
      })}
    </Slider>
  )
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PRISMIC_IMAGE_SHAPE,
    })
  ).isRequired,
}

export default Carousel
