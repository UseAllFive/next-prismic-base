// Styles that need to be globally accessible to components
import 'normalize.css'
import '../styles/global.scss'

import * as nextImage from 'next/image'

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      mobile: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
      tablet: {
        name: 'iPad',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '1024px',
        },
      },
    },
  },
}

// Replace next/image for Storybook
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    const { width, height, layout } = props
    const ratio = (height / width) * 100

    return (
      <div
        style={{
          maxWidth: layout !== 'fill' && width,
          display: 'inline-block',
          width: '100%',
        }}>
        <div
          style={{
            paddingBottom: layout !== 'fill' && `${ratio}%`,
            position: layout !== 'fill' ? 'relative' : 'absolute',
            overflow: layout === 'fill' && 'hidden',
            inset: layout === 'fill' && 0,
          }}>
          <img
            data-chromatic="ignore" // ignore images in Chromatic since placekittens are random
            style={{
              objectFit: 'cover',
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
            }}
            {...props}
          />
        </div>
      </div>
    )
  },
})
