import { graphql } from 'gatsby'
export const BLOCKQUOTE_FRAGMENT = graphql`
  fragment blockquote on SanityBlockquote {
    author
    citation
    text
  }
`
