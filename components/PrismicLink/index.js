import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { linkResolver, hrefResolver } from '../../lib/resolvers'
import PRISMIC_LINK_SHAPE from 'shapes/prismic/link'

const PrismicLink = ({ link, link_text }) => {
  return (
    <React.Fragment>
      {link._linkType === 'Link.document' ? (
        <Link href={hrefResolver(link)} as={linkResolver(link)}>
          <a>{link_text}</a>
        </Link>
      ) : (
        <a href={link.url} target={link.target}>
          {link_text}
        </a>
      )}
    </React.Fragment>
  )
}

PrismicLink.propTypes = {
  link: PRISMIC_LINK_SHAPE.isRequired,
  link_text: PropTypes.string.isRequired,
}

export default PrismicLink
