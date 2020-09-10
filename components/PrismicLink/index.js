import Link from 'next/link'
import { linkResolver, hrefResolver } from '../../lib/resolvers'

export default function PrismicLink({ link, link_text }) {
  return (
    <>
      {link._linkType === 'Link.document' ? (
        <Link href={hrefResolver(link)} as={linkResolver(link)}>
          <a>{link_text}</a>
        </Link>
      ) : (
        <a href={link.url} target={link.target}>
          {link_text}
        </a>
      )}
    </>
  )
}
