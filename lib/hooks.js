import { useEffect, useRef } from 'react'

export const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (onClickOutside) {
          onClickOutside()
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}

export const useEscapeKey = (ref, onEscape) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (onEscape) {
          onEscape()
        }
      }
    }
    // Bind the event listener
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, onEscape])
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
