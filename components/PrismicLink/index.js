import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { linkResolver } from 'lib/resolvers'
import prismicLinkShape from 'shapes/prismic/link'
import styles from './index.module.scss'

const PrismicLink = ({ className, activeClassName, link, children }) => {
  const { link_type, url, target } = link
  const DocumentLink = () => {
    const { asPath } = useRouter()
    const asPathWithSlash = `${asPath}/`
    const href = linkResolver(link)
    const isActive = asPathWithSlash === href
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
        rel={target === '_blank' && 'noreferrer'}>
        {children}
      </a>
    )
  }
  const NoLink = () => {
    return <span className={className}>{children}</span>
  }
  return (
    <React.Fragment>
      {link_type === 'Document' && <DocumentLink />}
      {link_type === 'Web' && <RegularLink />}
      {link_type === 'Any' && <NoLink />}
    </React.Fragment>
  )
}

PrismicLink.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  link: prismicLinkShape.isRequired,
  children: PropTypes.node,
}

export default PrismicLink
