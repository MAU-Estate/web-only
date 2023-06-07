import { graphql } from "gatsby"

export const fragments = graphql`
  fragment Image on SanityImageEntity {
    hotspot {
      height
      width
      x
      y
    }
    crop {
      bottom
      left
      right
      top
    }
    asset {
      _id
      
    }
  }

  fragment ImageWithPreview on SanityImageEntity {
    ...Image
    asset {
      metadata {
        preview: lqip
      }
    }
  }
`
