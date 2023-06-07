import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { Link } from 'gatsby'

const parseUrlType = url => {
  if (url?.includes('mailto:')) {
    return 'mailto'
  }
  try {
    if (new URL(url).origin !== window.location.origin) {
      return 'external'
    }
  } catch (error) {
    return 'default'
  }
}

const serializers = {
  //   // list: props => {
  //   //   const { type } = props
  //   //   const bullet = type === 'bullet'
  //   //   if (bullet) {
  //   //     return <ul>{<prop></prop>s.children}</ul>
  //   //   }
  //   //   return <ol>{props.children}</ol>
  //   // },
  //   // listItem: props => <li>{props.children}</li>,
  marks: {
    serif: props => {
      return <span className="f-6 inline-block">{props.children}</span>
    },
    link: props => {
      const href = props.mark.href
      let result
      switch (parseUrlType(href)) {
        case 'mailto':
          result = <a href={href}>{props.children}</a>
          break
        case 'external':
          result = (
            <a
              className="inline-block"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>
          )
          break
        default:
          result = (
            <Link className="inline-block" to={href}>
              {props.children}
            </Link>
          )
          break
      }
      return result
    },
  },
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    block: props => {
      return <p className="f-7">{props.children}</p>
    },
  },
}

const RichText = ({ content, className }) => {
  return (
    <BlockContent
      className={`richText ${className}`}
      blocks={content}
      renderContainerOnSingleChild={true}
      serializers={serializers}
    />
  )
}

export default RichText
