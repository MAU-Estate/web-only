import React, { useState } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Headroom from 'react-headroom'
import { Helmet } from 'react-helmet'

import Footer from './Footer'
import Menu from './Menu'
import Icon from './Icon'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'

const Layout = ({ location, children, className = '' }) => {
  // const isHome = location.pathname === '/'
  // const pathname = isHome ? 'home' : location.pathname.slice(1)
  // const cleanedPathname = pathname.replace(/\//i, '')

  const { atMedium, isSmall } = useCurrentBreakpoint()
  const [isMenuPinned, setIsMenuPinned] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuFixed, setIsMenuFixed] = useState(false)

  let menuBgClass
  switch (location.pathname) {
    case '/contact':
    case '/cv':
    case '/fellowships':
      menuBgClass = 'bg-black-c'
      break
    default:
      menuBgClass = 'bg-black'
      break
  }

  let menuToggleClass
  switch (location.pathname) {
    case '/':
    case '/contact':
    case '/cv':
    case '/fellowships':
      menuToggleClass = 'text-white'
      break
    default:
      menuToggleClass = 'text-black'
      break
  }

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          sanitySiteSettings {
            menuBgImage {
              ...ImageWithPreview
            }
          }
        }
      `}
      render={({ sanitySiteSettings }) => (
        <div className={`flex flex-col flex-1`}>
          <Helmet
            htmlAttributes={{ class: isMenuPinned ? 'header-pinned' : '' }}
          />
          <Menu
            onMenuToggle={value => setIsMenuOpen(value)}
            isOpen={isMenuOpen}
            menuBgClass={menuBgClass}
            bgImage={sanitySiteSettings.menuBgImage}
          />
          <div
            className="flex flex-col flex-1 relative"
            style={{
              marginLeft: atMedium ? '41px' : '',
              marginTop: atMedium ? '' : '-68px',
            }}
          >
            <Headroom
              className="z-30 md:z-10"
              style={{ marginTop: isMenuFixed || atMedium ? '' : '68px' }}
              disable={atMedium}
              onPin={() => {
                setIsMenuPinned(true)
              }}
              // pinStart={-68}
              onUnpin={() => {
                setIsMenuPinned(false)
                setIsMenuFixed(true)
              }}
              onUnfix={() => {
                setIsMenuPinned(false)
                setIsMenuFixed(false)
              }}
            >
              <header
                className={`
                  md:pt-a md:absolute z-30 left-0 right-0
                  sm-only:h-17
                  transition-colors
                  ${isMenuPinned && !isMenuOpen ? 'bg-white' : ''}
                `}
              >
                <div className="container w-full h-full sm-only:flex items-center justify-between">
                  <Link
                    to="/"
                    className={`
                    -mb-1
                    transition-colors
                      ${
                        isMenuPinned && !isMenuOpen
                          ? 'text-black'
                          : 'text-white'
                      }
                    `}
                  >
                    <Icon id="logo" name="logo" />
                  </Link>
                  {isSmall && (
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className={`z-10 transition-colors`}
                    >
                      <span className="sr-only">
                        menu {isMenuOpen ? 'close' : 'open'}
                      </span>
                      <Icon
                        name={isMenuOpen ? 'menuClose' : 'menu'}
                        className={`
                          Menu-toggle w-5 h-5 transition-colors
                          ${
                            (isMenuPinned && !isMenuOpen) ||
                            (!isMenuFixed && !isMenuOpen)
                              ? menuToggleClass
                              : 'text-white'
                          }
                        `}
                      />
                    </button>
                  )}
                </div>
              </header>
            </Headroom>
            <main className={`${className} ${location.pathname.split('/')[1]}`}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      )}
    />
  )
}

export default Layout
