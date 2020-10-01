import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { gg } from 'css-grid-guides'
import { useEffect } from 'react'
import classNames from 'classnames'

// global grid.
// please adjust the css properties to customize for your project.
const Grid = ({ children, guides }) => {
  useEffect(() => {
    gg()
  }, [guides])
  return (
    <div className={classNames({ [styles.grid]: true, grid: guides })}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.node,
  guides: PropTypes.bool,
}

export default Grid
