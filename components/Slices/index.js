import PropTypes from 'prop-types'
import RichText from 'components/RichText'
import Carousel from 'components/Carousel'
import { useGlobalContext } from 'components/Layout/global'

const Slices = ({ slices }) => {
  // TODO delete this global context example and use where necessary
  const { todoData } = useGlobalContext()

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

      <div>GLOBAL DATA: {todoData}</div>
    </>
  )
}

Slices.propTypes = {
  slices: PropTypes.array.isRequired,
}

export default Slices
