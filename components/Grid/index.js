import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'

// global grid.
// please adjust the css properties to customize for your project.
const Grid = ({ className, children, tag: Tag = 'div' }) => {
  return <Tag className={classNames(className, styles.grid)}>{children}</Tag>
}

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.string,
}

export default Grid
