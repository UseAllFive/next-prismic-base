import PropTypes from 'prop-types'
import RichText from 'components/Slices/RichText'
import Carousel from 'components/Slices/Carousel'

const Slices = ({ slices }) => {
  return (
    <>
      {slices.map((slice, i) => {
        let Component
        const { slice_type: type } = slice
        switch (type) {
          case 'richtext': {
            Component = <RichText richtext={slice.primary.richtext} />
            break
          }
          case 'carousel': {
            Component = <Carousel items={slice.items} />
            break
          }
          default:
            Component = <div>No slice found for {type}</div>
            break
        }
        return <div key={i}>{Component}</div>
      })}
    </>
  )
}

Slices.propTypes = {
  slices: PropTypes.array.isRequired,
}

export default Slices
