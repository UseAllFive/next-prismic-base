import Slider from 'react-slick'
import { Image } from 'rebass/styled-components'

export default function Carousel({ items }) {
  const settings = {
    dots: true,
  }
  return (
    <Slider {...settings}>
      {items.map(({ image }, i) => {
        return (
          <div key={i}>
            <Image width={1} src={image.url} alt={image.alt} />
          </div>
        )
      })}
    </Slider>
  )
}
