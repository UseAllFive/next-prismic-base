import classNames from 'classnames'
import PropTypes from 'prop-types'
import PrismicLink from 'components/Pieces/PrismicLink'
import styles from './index.module.scss'
import prismicLinkShape from 'shapes/prismic/link'
const Button = ({ className, link, children }) => {
  return (
    <PrismicLink link={link} className={classNames(className, styles.button)}>
      {children}
    </PrismicLink>
  )
}
Button.propTypes = {
  className: PropTypes.string,
  link: prismicLinkShape,
  children: PropTypes.node,
}
export default Button
