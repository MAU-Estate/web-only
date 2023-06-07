import React, { useEffect, useCallback } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'

import Icon from '../components/Icon'
import useKeyPress from '../hooks/useKeyPress'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'

const NAV_ITEMS = [
  { path: '/#intro', label: 'About Mary Ann' },
  { path: '/work', label: 'Work' },
  { path: '/exhibitions', label: 'Exhibitions' },
  { path: '/press', label: 'Press & Essays' },
  { path: '/fellowships', label: 'Fellowships' },
  { path: '/contact', label: 'Contact' },
  { path: '/cv', label: 'CV' },
]

export default function Menu({ bgImage, menuBgClass, onMenuToggle, isOpen }) {
  const esc = useKeyPress('Escape')
  const { atMedium, atLarge } = useCurrentBreakpoint()

  const handleOnMenuToggle = useCallback(
    (value = !isOpen) => onMenuToggle(value),
    [onMenuToggle, isOpen]
  )

  useEffect(() => {
    if (esc && isOpen) {
      handleOnMenuToggle(false)
    }
  }, [esc, isOpen, handleOnMenuToggle])

  return (
    <>
      {isOpen && <Helmet bodyAttributes={{ class: 'no-scroll' }} />}
      <div
        className={`
          ${isOpen ? '' : 'pointer-events-none'}
          fixed z-30 inset-0 flex`}
      >
        {atMedium && (
          <button
            className={`absolute h-full w-full inset-0 block transition-all
              ${
                isOpen
                  ? 'opacity-50 visible'
                  : 'opacity-0 pointer-events-none invisible'
              }`}
            onClick={() => handleOnMenuToggle(false)}
          >
            <span className="sr-only">Close menu</span>
          </button>
        )}

        <div
          className={`
            flex flex-col justify-top transition-transform duration-300 transform relative
            ${atLarge ? 'pl-20 pr-96' : 'flex-1 px-6'}
            ${isOpen ? '' : '-translate-x-full'}
          `}
          style={{ marginLeft: atMedium ? '41px' : '' }}
        >
          <nav
            className={`
            relative z-10
            flex-1
            flex flex-col
            ${atMedium ? 'mt-11' : 'mt-6'}
            `}
          >
            {atMedium && (
              <Link to="/" onClick={() => handleOnMenuToggle(false)}>
                <Icon name="logo" className="text-white" />
              </Link>
            )}
            <ul className=" flex-1 flex flex-col justify-center">
              {NAV_ITEMS.map(item => (
                <li key={item.path} className="f-menu">
                  <Link
                    style={{
                      textDecorationThickness: '4px',
                      textUnderlineOffset: '4px',
                    }}
                    className="block text-white hover:underline"
                    to={item.path}
                    onClick={() => handleOnMenuToggle()}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="left-0 top-0 bottom-0 right-0 absolute flex">
            <SanityImage
              {...bgImage}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {atMedium && (
        <div
          className="fixed z-30 flex items-start justify-center left-0 top-0 bottom-0"
          style={{ width: '41px' }}
        >
          <button
            onClick={() => handleOnMenuToggle()}
            className={`z-10 flex-1 self-stretch transition-colors ${menuBgClass}`}
          >
            <span
              className="absolute top-11 text-white left-[10px] transform -translate-x-full  origin-top-right -rotate-90 flex items-center"
              style={{ lineHeight: 1, fontSize: '20.5px' }}
            >
              EXPLORE{' '}
              <div className="transform rotate-90 ml-3">
                <Icon
                  name={isOpen ? 'menuClose' : 'menu'}
                  className="w-4 h-4"
                />
              </div>
            </span>
          </button>
        </div>
      )}
    </>
  )
}
