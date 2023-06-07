import React from 'react'
import BlockContent from '@sanity/block-content-to-react'

const RichText = ({ content, className }) => {
  return (
    <BlockContent
      className={`richText ${className}`}
      blocks={content}
      renderContainerOnSingleChild={true}
    />
  )
}

export default RichText
