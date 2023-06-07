import React, { useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'

// import { Link } from 'gatsby'
// import RichText from './RichText'
import Icon from './Icon'
import SanityImage from 'gatsby-plugin-sanity-image'
import RichTextSingle from './RichTextSingle'
import { Link } from 'gatsby'

const getSlideDimensions = (container, caption, imageDimensions) => {
  if (!container.current || !caption.current) return null
  const { width, height } = container.current.getBoundingClientRect()
  const { height: captionHeight } = caption.current.getBoundingClientRect()
  const adjustedHeight = height - captionHeight
  const imageAspectRatio = imageDimensions.width / imageDimensions.height

  // determine which dimensions will be the max size
  const index =
    width / imageDimensions.width < adjustedHeight / imageDimensions.height
      ? 0
      : 1

  return index
    ? { width: adjustedHeight * imageAspectRatio, height: adjustedHeight }
    : { width: width, height: width / imageAspectRatio }
}

const SlideImage = ({ className = '', dimensions, image, alt, url }) => {
  const container = useRef()
  const caption = useRef()
  const [slideDimensions, setSlideDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const imageDimensions = {
      width: dimensions.width,
      height: dimensions.height,
    }
    setSlideDimensions(getSlideDimensions(container, caption, imageDimensions))
    window.addEventListener('resize', () =>
      setSlideDimensions(
        getSlideDimensions(container, caption, imageDimensions)
      )
    )
    return () =>
      window.removeEventListener('resize', () =>
        setSlideDimensions(
          getSlideDimensions(container, caption, imageDimensions)
        )
      )
  }, [container, dimensions.width, dimensions.height])

  return (
    <figure
      ref={container}
      className={`${className} transition-opacity ${
        slideDimensions.width ? 'opacity-100' : 'opacity-0'
      } flex flex-1 justify-center items-center pointer-events-none`}
    >
      <Link
        to={url}
        className="flex flex-col justify-center items-center group pointer-events-auto"
        style={{
          width: `${slideDimensions.width}px`,
        }}
      >
        <div
          style={{
            minHeight: 0,
          }}
        >
          <div
            style={{
              height: `${slideDimensions.height}px`,
              width: `${slideDimensions.width}px`,
            }}
          >
            <SanityImage
              {...image.src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
              alt={alt}
            />
          </div>
        </div>
        {image.figcaption && (
          <figcaption ref={caption} className={`flex-none w-full`}>
            {image.figcaption && (
              <RichTextSingle
                content={image.figcaption._rawText}
                className={`pt-c f-8 text-white group-hover:underline mb-1`}
              />
            )}
          </figcaption>
        )}
      </Link>
    </figure>
  )
}

const Slide = ({ data }) => {
  return (
    <SlideImage
      url={data.url}
      image={data.image}
      alt={data.image.alt}
      dimensions={data.image.src.asset.metadata.dimensions}
    />
  )
}

const NewsSlide = ({ data }) => {
  return (
    <Link to={data.url} className="flex-1 grid grid-cols-2 gap-0 group">
      <div className="text-white text-center flex flex-col justify-center px-12 group-hover:underline">
        <p className="f-11">{data.subhead}</p>
        <div className="border-t pt-u mt-t">
          <h1 className="f-10">{data.title}</h1>
        </div>
      </div>
      <div className="flex flex-1 px-12">
        <SlideImage image={data.image} alt={data.image.alt} />
      </div>
    </Link>
  )
}

const SliderArrow = ({ type = 'previous', onClick, theme }) => {
  const isPrevious = type === 'previous'
  const isDark = theme === 'dark'
  return (
    <div
      className={`sm-only:order-1 sm-only:w-1/2 hidden md:flex md:absolute inset-0 h-14 md:flex-1 md:h-full pointer-events-none ${
        isPrevious ? 'justify-end left-1/2' : 'justify-start right-1/2'
      }`}
    >
      <button
        onClick={onClick}
        className={`
            focus:outline-none
            pointer-events-auto
            md:h-full
            flex
            flex-1
            items-center
            ${isDark ? 'text-white' : 'text-black'}
            ${isPrevious ? 'justify-end' : 'justify-start '}
          `}
      >
        <Icon
          name={isPrevious ? 'arrowRight' : 'arrowLeft'}
          className="h-10 w-10 text-grey-c"
        />
      </button>
    </div>
  )
}

export default function Gallery({
  slides,
  onChange,
  className = '',
  theme = 'dark',
}) {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    swipe: true,
    beforeChange: (_, newIdx) => {
      onChange &&
        onChange(
          slides[newIdx]._type === 'slide' ? 'bg-transparent' : 'bg-[#4e5c59]'
        )
    },
    nextArrow: <SliderArrow theme={theme} />,
    prevArrow: <SliderArrow theme={theme} type="next" />,
  }
  const sliderRef = useRef()

  return (
    <div className={`Gallery Gallery--home flex-1  ${className}`}>
      <Slider
        className="sm-only:mb-6 px-6 md:px-[60px]"
        ref={slider => (sliderRef.current = slider)}
        {...settings}
      >
        {slides.map((slide, i) => {
          return slide._type === 'slide' ? (
            <Slide key={slide._key} data={slide} route={slide.url} />
          ) : (
            <NewsSlide key={slide._key} data={slide} route={slide.url} />
          )
        })}
      </Slider>
    </div>
  )
}
