export const disableSetting = {
  table: {
    disable: true,
  },
}

export const storyImage = (url = '/images/demo.jpg') => ({
  dimensions: {
    width: 1080,
    height: 1081,
  },
  url,
})

export const storyLink = { link_type: 'Web', url: 'https://www.google.com' }

export const storyRichText = (copy) => [
  { type: 'paragraph', text: copy, spans: [] },
]

export const storyHeading = (copy, size = '1') => [
  { type: `heading${size}`, text: copy, spans: [] },
]
