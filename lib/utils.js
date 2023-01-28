import { useState, useEffect } from 'react'

// function to sluggify any string
export const sluggify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const useDocumentSize = (ele) => {
  const [documentSize, setDocumentSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const element = ele ?? document?.documentElement

    const handleResize = () => {
      const width = element?.getBoundingClientRect().width
      const height = element?.getBoundingClientRect().height
      setDocumentSize({ width: width, height: height })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ele])

  return documentSize
}
