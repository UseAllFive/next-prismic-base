import PrismicLink from '../PrismicLink'

export default function Header({ header }) {
  return (
    <header>
      <ul>
        {header.links.map(({ link, link_text }, i) => {
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
