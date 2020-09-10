import Slider from 'react-slick'
import styles from './index.module.scss'

export default function Carousel({ items }) {
  const settings = {
    dots: true,
  }
  return (
    <Slider {...settings}>
      {items.map(({ image }, i) => {
        return (
          <div key={i}>
            <img className={styles.image} src={image.url} alt={image.alt} />
          </div>
        )
      })}
    </Slider>
  )
}
