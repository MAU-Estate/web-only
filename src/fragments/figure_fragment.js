import { graphql } from 'gatsby'

export const FIGURE_FRAGMENT = graphql`
  fragment figure on SanityFigure {
    _key
    alt
    src {
      ...ImageWithPreview
      asset {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
        metadata {
          dimensions {
            aspectRatio
            height
            width
          }
        }
      }
    }
    figcaption {
      _rawText
    }
  }
`
