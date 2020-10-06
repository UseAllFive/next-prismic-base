const IS_PROD = process.env.NODE_ENV === 'production'

// TODO: update with real tracking ID
export const GA_TRACKING_ID = 'UA-XXXXXXXXX-X'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (IS_PROD) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (IS_PROD) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}
