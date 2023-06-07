import { graphql } from 'gatsby'

export const GALLERY_FRAGMENT = graphql`
  fragment gallery on SanityGalleryObj {
    galleryRef {
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
            ...figure
          }
          imageR {
            ...figure
          }
        }
      }
    }
  }
`
