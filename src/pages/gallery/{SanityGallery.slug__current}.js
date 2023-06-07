import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3'

import GalleryModal from '../../components/GalleryModal'
import Icon from '../../components/Icon'
import Seo from '../../components/Seo'

export default function gallery({
  location,
  data: {
    sanityGallery: { images, slug, backUrl, seo },
  },
}) {
  const backPath =
    backUrl === '/'
      ? `/#${slug.current}`
      : backUrl === 'press'
      ? `/${backUrl}#${slug.current}`
      : `/${backUrl}/${slug.current}`

  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => {
        return (
          <>
            {modal ? (
              <div className="absolute inset-0 pt-12 pb-8 flex">
                <button
                  onClick={() => navigate(closeTo)}
                  className="absolute z-30 top-0 right-0"
                >
                  <Icon
                    name="modalClose"
                    className="sm-only:w-6 sm-only:h-6 w-12 h-12 m-4 md:m-10"
                  />
                </button>
                <div className="mx-6 md:container--large flex flex-1">
                  <GalleryModal
                    location={location}
                    slides={images}
                    theme="light"
                  />
                </div>
              </div>
            ) : (
              <div className="fixed inset-0 pt-12 pb-8 z-30 bg-white flex">
                <Seo {...seo} />
                <Link to={backPath} className="absolute z-30 top-0 right-0">
                  <Icon
                    name="modalClose"
                    className="sm-only:w-6 sm-only:h-6 w-12 h-12 m-4"
                  />
                </Link>
                <div className="mx-6 md:container--large flex flex-1">
                  <GalleryModal
                    location={location}
                    slides={images}
                    theme="light"
                  />
                </div>
              </div>
            )}
          </>
        )
      }}
    </ModalRoutingContext.Consumer>
  )
}

export const galleryQuery = graphql`
  query ($id: String) {
    sanityGallery(id: { eq: $id }) {
      seo {
        description
        title
        image {
          ...Image
        }
      }
      slug {
        current
      }
      backUrl
      images {
        ... on SanityFigure {
          _key
          _type
          ...figure
        }
        ... on SanityTwoColImage {
          _key
          _type
          imageL {
            _key
            _type
            ...figure
          }
          imageR {
            _key
            _type
            ...figure
          }
        }
      }
    }
  }
`
