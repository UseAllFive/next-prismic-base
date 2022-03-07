import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import PropTypes from 'prop-types'
import prismicImageShape from 'shapes/prismic/image'
import styles from './styles.module.scss'

const Carousel = ({ items }) => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div ref={emblaRef} className={styles.carousel}>
      <div className={styles.container}>
        {items.map(({ image }, i) => {
          return (
            <div key={i} className={styles.slide}>
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
      </div>
    </div>
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
