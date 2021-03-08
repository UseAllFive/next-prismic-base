import PrismicLink from 'components/Pieces/PrismicLink'
import headerShape from './shape'

const Header = ({ header }) => {
  return (
    <header>
      <ul>
        {header?.links.map(({ link, link_text }, i) => {
          return (
            <li key={i}>
              <PrismicLink link={link}>{link_text}</PrismicLink>
            </li>
          )
        })}
      </ul>
    </header>
  )
}

Header.propTypes = {
  header: headerShape,
}

export default Header
