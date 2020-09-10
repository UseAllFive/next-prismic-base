import RichText from '../RichText'
import Carousel from '../Carousel'

export default function Slices({ slices }) {
  return (
    <>
      {slices.map((slice, i) => {
        let Component
        switch (slice.type) {
          case 'richtext': {
            Component = <RichText richtext={slice.primary.richtext} />
            break
          }
          case 'carousel': {
            Component = <Carousel items={slice.fields} />
            break
          }
          default:
            Component = <div>No slice found for {slice.type}</div>
            break
        }
        return <div key={i}>{Component}</div>
      })}
    </>
  )
}
