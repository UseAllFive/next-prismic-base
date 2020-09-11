import PropTypes from 'prop-types'
import PrismicLink from '../PrismicLink'
import PRISMIC_LINK_SHAPE from 'shapes/prismic/link'

const Header = ({ header }) => {
  return (
    <header>
      <ul>
        {header?.links.map(({ link, link_text }, i) => {
          return (
            <li key={i}>
              <PrismicLink link={link} link_text={link_text} />
            </li>
          )
        })}
      </ul>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.shape({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        link: PRISMIC_LINK_SHAPE,
        link_text: PropTypes.string,
      })
    ),
  }),
}

export default Header
