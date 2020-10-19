import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { linkResolver, hrefResolver } from 'lib/resolvers'
import prismicLinkShape from 'shapes/prismic/link'

const PrismicLink = ({ className, link, children }) => {
  const { link_type, url, target } = link
  const rel = target === '_blank' ? 'noreferrer' : null
  return (
    <React.Fragment>
      {link_type === 'Document' ? (
        <Link href={hrefResolver(link)} as={linkResolver(link)}>
          <a className={className}>{children}</a>
        </Link>
      ) : (
        <a className={className} href={url} target={target} rel={rel}>
          {children}
        </a>
      )}
    </React.Fragment>
  )
}

PrismicLink.propTypes = {
  className: PropTypes.string,
  link: prismicLinkShape.isRequired,
  children: PropTypes.node,
}

export default PrismicLink
