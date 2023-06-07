import React, { useEffect, useRef, useState } from 'react'
import { Link, navigate } from 'gatsby'
import useKeyPress from '../hooks/useKeyPress'

import Icon from './Icon'

export default function ProjectHeader({
  className = '',
  title,
  backPath,
  nextPath,
  prevPath,
}) {
  const [isSticky, setIsSticky] = useState(false)
  const left = useKeyPress('ArrowLeft')
  const right = useKeyPress('ArrowRight')

  if (left) navigate(prevPath)
  if (right) navigate(nextPath)

  const element = useRef()

  useEffect(() => {
    const _element = element.current
    const callback = e => {
      setIsSticky(!e[0].isIntersecting)
    }
    const observer = new IntersectionObserver(callback, {
      rootMargin: '20px 0px 0px 0px',
      threshold: [1],
    })

    observer.observe(_element)

    return () => {
      observer.unobserve(_element)
    }
  }, [element])

  return (
    <div
      ref={element}
      className={`ProjectHeader ${className} sm-only:pb-4 sticky pt-11 -top-7 z-20`}
    >
      <div
        className={`absolute inset-0 bg-white xease-linear xtransition-transform xduration-75 ${
          isSticky ? 'md:-translate-y-2' : ''
        }`}
        style={{ zIndex: -1 }}
      ></div>
      <div className="border-t border-grey-b mb-t w-full"></div>
      <div
        className={`flex justify-between items-start xease-linear xtransition-transform xduration-75 ${
          isSticky ? 'md:-translate-y-2' : ''
        }`}
      >
        <h1
          className={`f-21 origin-top-left xease-linear xtransition-transform xduration-75 ${
            isSticky ? 'md:scale-75' : ''
          }`}
        >
          {title}
        </h1>
        <div
          className={`md:ml-[160px] lg:ml-[320px] -h-11 flex items-center origin-top-right xease-linear xtransition-transform xduration-75 ${
            isSticky ? 'md:scale-75' : ''
          }`}
        >
          <Link to={backPath} className="flex">
            <Icon name="grid" className="w-[24px] md:w-[36px] mx-6 h-full" />
          </Link>
          <div className="border-r border-grey-b self-stretch"></div>
          <Link to={prevPath} className="flex pl-6 pr-3">
            <Icon name="arrowLeft" className="w-[14px] md:w-[22px] h-full" />
          </Link>
          <Link to={nextPath} className="flex pl-3">
            <Icon name="arrowRight" className="w-[14px] md:w-[22px] h-full" />
          </Link>
        </div>
      </div>
    </div>
  )
}
