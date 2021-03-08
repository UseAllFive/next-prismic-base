import PropTypes from 'prop-types'
import { metaProps } from 'components/Layout/Meta/shape'

const pageShape = PropTypes.shape({
  data: PropTypes.shape({
    body: PropTypes.array,
    slug: PropTypes.string,
    header_theme: PropTypes.oneOf(['light', 'dark']),
    ...metaProps,
  }),
  id: PropTypes.string,
})

export default pageShape
