import { useMemo } from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { linkResolver } from 'lib/resolvers'
import prismicDocumentShape from 'shapes/prismic/document'

// Creates next/link component from Prismic document object
// (e.g. data from content relation field)
// Adds an active class to links that match current route
const Link = ({
  activeIsExact, // Defaults to matching all parents of current route as active
  activeClassName,
  className,
  document = {},
  children,
  ...props
}) => {
  const href = useMemo(() => linkResolver(document), [document])

  let isActive

  // Determine if document matches current route
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
    <NextLink {...{ href }}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={cn(className, { [activeClassName]: isActive })} {...props}>
        {children}
      </a>
    </NextLink>
  )
}

const prismicLinkPropTypes = {
  activeClassName: PropTypes.string,
  activeIsExact: PropTypes.bool,
  className: PropTypes.string,
  document: prismicDocumentShape,
  children: PropTypes.node,
}

Link.propTypes = prismicLinkPropTypes

export default Link
