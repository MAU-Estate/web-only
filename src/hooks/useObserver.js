import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import { useCallback } from 'react'

const useObserver = ({ callback, element }) => {
  const current = element && element.current

  const observer = useRef(null)
  const observe = useCallback(() => {
    if (element && element.current && observer.current) {
      observer.current.observe(element.current)
    }
  }, [element, observer])

  useEffect(() => {
    // if we are already observing old element
    if (observer && observer.current && current) {
      observer.current.unobserve(current)
    }
    const resizeObserverOrPolyfill = ResizeObserver
    observer.current = new resizeObserverOrPolyfill(callback)
    observe()

    return () => {
      if (observer && observer.current && current) {
        observer.current.unobserve(current)
      }
    }
  }, [current, observe, callback, element])
}

useObserver.propTypes = {
  element: PropTypes.object,
  callback: PropTypes.func,
}

export default useObserver
