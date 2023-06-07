import { graphql } from 'gatsby'

export const IMAGE_FRAGMENT = graphql`
  fragment image on SanityPreviewImage {
    asset {
      gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
      metadata {
        dimensions {
          aspectRatio
        }
      }
    }
    alt
  }
`
