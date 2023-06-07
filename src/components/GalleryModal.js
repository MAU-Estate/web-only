import React, { useRef, useState, useEffect } from 'react'
import Slider from 'react-slick'

import queryString from 'query-string'

import { SlideCaption } from './Gallery'
import Icon from './Icon'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import SanityImage from 'gatsby-plugin-sanity-image'

const SlideImage = ({ src, alt }) => {
  const isPortrait = src.asset.metadata.dimensions.aspectRatio < 1

  return (
    <SanityImage
      {...src}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
      width={isPortrait ? 750 : 1300}
      alt={alt}
    />
  )
}

const Slide = ({ data }) => {
  if (!data.src) return <></>
  return <SlideImage src={data.src} alt={data.src.asset.altText} />
}

const SliderArrow = ({ type = 'previous', onClick, theme, className }) => {
  const isPrevious = type === 'previous'
  const isDark = theme === 'dark'
  return (
    <div
      className={`sm-only:hidden md:absolute inset-0 flex-1 h-full pointer-events-none md:flex
        ${
          isPrevious
            ? 'justify-end right-[-60px] '
            : 'justify-start left-[-60px]'
        }
        ${className}
      `}
    >
      <button
        onClick={onClick}
        className={`
            focus:outline-none
            pointer-events-auto
            h-full
            flex
            w-1/2
            items-center
            ${isDark ? 'text-white' : 'text-black'}
            ${isPrevious ? 'justify-end' : 'justify-start '}
          `}
      >
        <Icon
          name={isPrevious ? 'arrowRight' : 'arrowLeft'}
          className="h-6 w-3 md:h-10 md:w-6 text-grey-c"
        />
      </button>
    </div>
  )
}

export default function Gallery({
  location,
  slides,
  className = '',
  theme = 'dark',
}) {
  const { isSmall } = useCurrentBreakpoint()
  const [controller, setController] = useState()
  const indexParam = queryString.parse(location.search, {
    arrayFormat: 'comma',
  })?.index
  const initialSlide = indexParam ? Number(indexParam) : 0

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    swipe: true,
    focusOnSelect: true,
    initialSlide,
    nextArrow: <SliderArrow theme={theme} />,
    prevArrow: <SliderArrow theme={theme} type="next" />,
  }
  const navGallerySettings = {
    infinite: true,
    afterChange: index => {
      window.history.pushState(
        { path: `${location.pathname}?index=${index}` },
        '',
        `${location.pathname}?index=${index}`
      )
    },
    accesibility: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    fade: true,
    swipe: false,
    initialSlide,
  }
  const sliderRef = useRef()
  const sliderCaptionsRef = useRef()

  const parsedSlides = []

  // handle 2 Column images
  slides.forEach(slide => {
    if (slide._type === 'figure') parsedSlides.push(slide)
    if (slide._type === 'twoColImage') {
      if (slide.imageL) {
        slide.imageL._key = `${slide._key}-left`
        parsedSlides.push(slide.imageL)
      }
      if (slide.imageR) {
        slide.imageR._key = `${slide._key}-right`
        parsedSlides.push(slide.imageR)
      }
    }
  })

  useEffect(() => {
    setController(sliderCaptionsRef.current)
    sliderRef.current.innerSlider.list.firstChild.firstChild.focus()
  }, [sliderCaptionsRef])

  return (
    <div className={`Gallery Gallery--modal flex flex-1 flex-col ${className}`}>
      <div className="relative z-20 flex-1">
        <Slider
          asNavFor={controller}
          ref={slider => (sliderRef.current = slider)}
          {...settings}
        >
          {parsedSlides.map((slide, i) => (
            <Slide key={slide._key} data={slide} />
          ))}
        </Slider>
      </div>
      <div className="relative h-14">
        <Slider
          ref={slider => (sliderCaptionsRef.current = slider)}
          {...navGallerySettings}
          className="Slider-captions"
        >
          {parsedSlides.map((slide, i) => (
            <SlideCaption
              key={`${slide._key}-caption`}
              index={i}
              galleryLength={slides.length}
              arrows={false}
              inline={true}
              data={slide}
              theme={'light'}
            />
          ))}
        </Slider>
      </div>
      {isSmall && (
        <div className="flex justify-between mt-8">
          <SliderArrow
            onClick={sliderRef.current.slickPrev}
            theme={theme}
            className={'!flex'}
            type="next"
          />
          <SliderArrow
            onClick={sliderRef.current.slickNext}
            theme={theme}
            className={'!flex'}
          />
        </div>
      )}
    </div>
  )
}
