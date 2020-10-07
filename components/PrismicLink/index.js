import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { linkResolver, hrefResolver } from '../../lib/resolvers'
import PRISMIC_LINK_SHAPE from 'shapes/prismic/link'

const PrismicLink = ({ link, link_text }) => {
  const { _linkType, url, target } = link
  return (
    <React.Fragment>
      {_linkType === 'Link.document' ? (
        <Link href={hrefResolver(link)} as={linkResolver(link)}>
          <a>{link_text}</a>
        </Link>
      ) : (
        <a href={url} target={target} rel={target === '_blank' && 'noopener'}>
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
