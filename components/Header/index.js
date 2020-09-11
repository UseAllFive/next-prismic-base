import PrismicLink from '../PrismicLink'
import HEADER_SHAPE from './shape'

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
  header: HEADER_SHAPE,
}

export default Header
