import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { gg } from 'css-grid-guides'
import { useEffect } from 'react'
import classNames from 'classnames'

// global grid.
// please adjust the css properties to customize for your project.
const Grid = ({ children, guides, tag: Tag = 'div' }) => {
  useEffect(() => {
    gg()
  }, [guides])
  return (
    <Tag className={classNames({ [styles.grid]: true, grid: guides })}>
      {children}
    </Tag>
  )
}

Grid.propTypes = {
  children: PropTypes.node,
  guides: PropTypes.bool,
  tag: PropTypes.string,
}

export default Grid
