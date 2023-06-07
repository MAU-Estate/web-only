import React from 'react'
import { Link } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'
import Icon from '../components/Icon'

const EnlargeIndicator = () => (
  <div className="h-8 w-8 absolute top-4 left-4 transition-opacity opacity-0 group-hover:opacity-100">
    <Icon name="plus" className="h-full w-full" />
  </div>
)

const ProjectGallery = ({
  className = '',
  data: {
    galleryRef: { slug, images },
  },
  location,
}) => {
  const slugPath = slug.current

  return (
    <div className={className}>
      {images.map((item, i) => {
        const isPortrait =
          item._type !== 'twoColImage' &&
          item.src &&
          item.src?.asset &&
          item.src.asset.metadata.dimensions.aspectRatio < 1
        return item._type === 'twoColImage' ? (
          <div
            key={item._key}
            className="sm-only:gap-y-a grid col-span-4 md:grid-cols-2 mb-a "
          >
            {item.imageL && (
              <Link
                to={`/gallery/${slugPath}?index=${i}`}
                state={{
                  modal: true,
                }}
                className="relative group"
              >
                <EnlargeIndicator />
                <SanityImage
                  {...item.imageL.src}
                  alt={item.imageL.alt}
                  width={500}
                />
              </Link>
            )}
            {item.imageR && (
              <Link
                to={`/gallery/${slugPath}?index=${i}`}
                state={{
                  modal: true,
                }}
                className="relative group"
              >
                <EnlargeIndicator />
                <SanityImage
                  {...item.imageR.src}
                  alt={item.imageR.alt}
                  width={500}
                />
              </Link>
            )}
          </div>
        ) : (
          <Link
            key={item._key}
            to={`/gallery/${slugPath}?index=${i}`}
            state={{
              modal: true,
            }}
            className={`mb-a relative group ${
              isPortrait ? 'col-span-2' : 'col-span-4'
            }`}
          >
            <EnlargeIndicator />
            {item.src && (
              <SanityImage
                {...item.src}
                alt={item.alt}
                width={isPortrait ? 500 : 1000}
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default ProjectGallery
