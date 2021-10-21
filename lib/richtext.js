// Re-formats Prismic HTML
export const htmlSerializer = (type, element, children, key) => {
  switch (type) {
    case 'paragraph':
      // Remove weird LSEP character on windows machines
      // Usually generated from copy + paste in other programs
      if (element.text.match(/\u2028/)) {
        const updatedText = element.text.replace(/\u2028/g, ' ')

        return (
          <p
            key={key}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: updatedText }}
          />
        )
      }

      break
    default:
      // Return null to stick with the default behavior
      return null
  }
}
