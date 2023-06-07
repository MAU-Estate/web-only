import React from 'react'
import SanityImage from 'gatsby-plugin-sanity-image'

import RichTextSingle from './RichTextSingle'
export default function Figure({ image, className = '', objectFit = 'cover' }) {
  return (
    <figure className={className}>
      <SanityImage
        {...image.src}
        // image={image.src.asset.gatsbyImageData}
        // alt={image.alt}
        // objectFit={objectFit}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          objectPosition: 'center',
        }}
        className="flex-1"
        alt={image.alt}
      />
      {image.figcaption && (
        <figcaption className={`flex-1`}>
          {image.figcaption && (
            <RichTextSingle
              content={image.figcaption._rawText}
              className={`pt-c f-8`}
            />
          )}
        </figcaption>
      )}
    </figure>
  )
}
