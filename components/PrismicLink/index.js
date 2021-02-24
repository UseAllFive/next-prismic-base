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
  const { link_type, url, target } = link

  const DocumentLink = () => {
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
  const RegularLink = () => {
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
  const NoLink = () => {
    return <span className={className}>{children}</span>
  }
  const JumpLink = () => {
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

  const CustomLink = () => {
    if (link_type === 'Document' || nextLink) {
      return <DocumentLink />
    } else if (
      link_type === 'Web' &&
      url &&
      url.indexOf('https://anchor') !== -1
    ) {
      return <JumpLink />
    } else if (
      link_type === 'Web' &&
      url &&
      url.indexOf('https://anchor') === -1
    ) {
      return <RegularLink />
    } else {
      return <NoLink />
    }
  }

  return <CustomLink />
}

PrismicLink.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  link: PropTypes.oneOfType([prismicLinkShape, PropTypes.string]),
  nextLink: PropTypes.bool,
  children: PropTypes.node,
}

export default PrismicLink
