import React from 'react'

export default function Blockquote({ quote, className }) {
  return (
    <blockquote className={className}>
      <p className="f-14 mb-f">{quote.text}</p>
      <cite className="f-15 not-italic inline-block">
        {quote.author}
        <br></br>
        <span className="text-grey-a">{quote.citation}</span>
      </cite>
    </blockquote>
  )
}
