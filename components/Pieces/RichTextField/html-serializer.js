import React from 'react'
import { Elements } from 'prismic-richtext'
import Image from 'next/image'
import PrismicLink from '../PrismicLink'

// -- HTML Serializer
// This function will be used to change the way the HTML is loaded
const htmlSerializer = function (type, element, content, children, key) {
  switch (type) {
    case Elements.image:
      // support links wrapped with images
      if (element.linkTo) {
        return (
          <p key={key}>
            <PrismicLink link={element.linkTo}>
              <Image
                src={element.url}
                quality={100}
                width={element.dimensions.width}
                height={element.dimensions.height}
                alt={element.alt || ''}
              />
            </PrismicLink>
          </p>
        )
      } else {
        return (
          <p key={key}>
            <Image
              src={element.url}
              quality={100}
              width={element.dimensions.width}
              height={element.dimensions.height}
              alt={element.alt || ''}
            />
          </p>
        )
      }
    case Elements.hyperlink:
      // update hyperlinks to use resolver
      if (element?.data?.link_type === 'Document') {
        return (
          <PrismicLink key={key} link={element?.data}>
            {content}
          </PrismicLink>
        )
      } else {
        return null
      }
    // Return null to stick with the default behavior
    default:
      return null
  }
}

export default htmlSerializer
