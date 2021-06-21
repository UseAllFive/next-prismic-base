import React from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { linkResolver } from 'lib/resolvers'
import prismicLinkShape from 'shapes/prismic/link'
import styles from './index.module.scss'
import { Link as L } from 'prismic-reactjs'

// Passes Prismic link objects into next/link
// Can handle links to Documents and Web
// Adds an active class to links that match current route
const PrismicLink = ({
  activeIsExact, // Defaults to matching all parents of current route as active
  activeClassName,
  className,
  link = {},
  children,
}) => {
  let isActive
  const href = L.url(link, linkResolver)

  // Determine if link matches current route
  const { asPath } = useRouter()
  if (asPath) {    
    const i = asPath.indexOf('?')
    const path = i > 0 ? `${asPath.substring(0, i)}/` : `${asPath}/`
    const LEADING_AND_TRAILING_SLASH_REGEX = /^\/|\/$/g
    const trimmedPath = path.replace(LEADING_AND_TRAILING_SLASH_REGEX, '')
    const trimmedHref = href.replace(LEADING_AND_TRAILING_SLASH_REGEX, '')
    isActive = activeIsExact
      ? trimmedPath === trimmedHref
      : trimmedPath.indexOf(trimmedHref) > -1
  }

  return (
    <Link {...{ href }}>
      <a
        className={cn(styles.link, className, {
          [activeClassName]: isActive,
          [styles.linkActive]: isActive,
        })}
        rel={link.link_type === 'Web' ? 'noreferrer' : ''}
        target={link.target}>
        {children}
      </a>
    </Link>
  )
}

const prismicLinkPropTypes = {
  activeClassName: PropTypes.string,
  activeIsExact: PropTypes.bool,
  className: PropTypes.string,
  link: prismicLinkShape,
  children: PropTypes.node,
}

PrismicLink.propTypes = prismicLinkPropTypes

export default PrismicLink
