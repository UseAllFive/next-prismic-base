import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { linkResolver } from 'lib/resolvers'
import prismicLinkShape from 'shapes/prismic/link'
import styles from './index.module.scss'

const PrismicLink = ({
  className,
  activeClassName,
  link = {},
  nextLink,
  children,
}) => {
  const { link_type, url } = link
  const linkProps = { className, activeClassName, link, nextLink, children }

  if (link_type === 'Document' || nextLink) {
    return <DocumentLink {...linkProps} />
  } else if (
    link_type === 'Web' &&
    url &&
    url.indexOf('https://anchor') !== -1
  ) {
    return (
      <JumpLink
        className={className}
        link={link}
        activeClassName={activeClassName}>
        {children ?? ''}
      </JumpLink>
    )
  } else if (
    link_type === 'Web' &&
    url &&
    url.indexOf('https://anchor') === -1
  ) {
    return (
      <RegularLink className={className} link={link}>
        {children ?? ''}
      </RegularLink>
    )
  } else {
    return <NoLink className={className}>{children ?? ''}</NoLink>
  }
}

PrismicLink.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  link: PropTypes.oneOfType([prismicLinkShape, PropTypes.string]),
  nextLink: PropTypes.bool,
  children: PropTypes.node,
}

export default PrismicLink

const DocumentLink = ({
  className,
  activeClassName,
  nextLink,
  link,
  children,
}) => {
  let isActive
  const href = nextLink ? link : linkResolver(link)
  if (useRouter()) {
    const { asPath } = useRouter()
    const i = asPath.indexOf('?')
    const path = i > 0 ? `${asPath.substring(0, i)}/` : `${asPath}/`
    isActive = path.indexOf(href) > -1
  }
  return (
    <Link href={href}>
      <a
        className={classNames(styles.link, className, {
          [activeClassName]: isActive,
          [styles.linkActive]: isActive,
        })}>
        {children}
      </a>
    </Link>
  )
}

DocumentLink.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  link: PropTypes.oneOfType([prismicLinkShape, PropTypes.string]),
  nextLink: PropTypes.bool,
  children: PropTypes.node,
}

const RegularLink = (className, children, link) => {
  const { url, target } = link || {}
  return (
    <a
      className={classNames(styles.link, className)}
      href={url}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : 'false'}>
      {children}
    </a>
  )
}

RegularLink.propTypes = {
  className: PropTypes.string,
  link: PropTypes.oneOfType([prismicLinkShape, PropTypes.string]),
  children: PropTypes.node,
}

const NoLink = ({ className, children }) => {
  return <span className={className}>{children}</span>
}

NoLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

const JumpLink = ({ className, link, children, activeClassName }) => {
  const { url } = link
  const router = useRouter()
  const href = url?.split('https://anchor:')[1]
  const jump = (e) => {
    e.preventDefault()
    router.push(href, undefined)
  }
  const isActive = router.asPath.replace('?', '/?') === href

  return (
    <a
      onClick={jump}
      className={classNames(styles.link, className, {
        [activeClassName]: isActive,
        [styles.linkActive]: isActive,
      })}
      href={href}>
      {children}
    </a>
  )
}

JumpLink.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  link: PropTypes.oneOfType([prismicLinkShape, PropTypes.string]),
  children: PropTypes.node,
}
