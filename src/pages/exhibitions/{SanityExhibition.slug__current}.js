import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import ProjectHeader from '../../components/ProjectHeader'
import RichTextSingle from '../../components/RichTextSingle'
import ProjectGallery from '../../components/ProjectGallery'
import Seo from '../../components/Seo'

export default function exhibition({
  data: {
    sanityExhibition: {
      seo,
      date,
      title,
      id,
      gallery,
      venue,
      curator,
      content,
      isSolo,
      location,
    },
    allSanityExhibition: { edges },
  },
}) {
  const currentItem = edges.find(edge => edge.node.id === id)
  if (!currentItem.next) currentItem.next = edges[0].node
  if (!currentItem.previous) currentItem.previous = edges[edges.length - 1].node

  return (
    <div className="container mt-a2 mb-i">
      <Seo {...seo} />
      <Helmet bodyAttributes={{ class: 'theme--light' }} />
      <ProjectHeader
        backPath={'/exhibitions'}
        title={title}
        prevPath={`../${currentItem.previous.slug.current}`}
        nextPath={`../${currentItem.next.slug.current}`}
      />
      <div className="grid md:grid-cols-12 mt-h">
        <div className="md:col-span-5 xl:col-span-4 sm-only:order-1">
          <dl className="lg:grid lg:grid-cols-2">
            <div className="mb-10">
              <dt className="f-7 uppercase mb-3">Exhibition Title</dt>
              <dd className="f-6">{title}</dd>
            </div>
            <div className="mb-10">
              <dt className="f-7 uppercase mb-3">Show Type</dt>
              <dd className="f-6">{isSolo ? 'Solo' : 'Group'}</dd>
            </div>
            {curator && (
              <div className="mb-10">
                <dt className="f-7 uppercase mb-3">Curator</dt>
                <dd className="f-6">{curator}</dd>
              </div>
            )}
            <div className="mb-10">
              <dt className="f-7 uppercase mb-3">Venue</dt>
              <dd className="f-6">{venue}</dd>
            </div>
            <div className="mb-10">
              <dt className="f-7 uppercase mb-3">Year</dt>
              <dd className="f-6">{date}</dd>
            </div>
            <div className="mb-10">
              <dt className="f-7 uppercase mb-3">Location</dt>
              <dd className="f-6">{location}</dd>
            </div>
          </dl>
          {content &&
            content.map(block => (
              <div
                key={block._key}
                className="border-t border-grey-b pt-v mt-m"
              >
                <div className="mb-n">
                  <h2 className="f-25">{block.header}</h2>
                </div>
                <RichTextSingle className="f-6" content={block.body._rawText} />
              </div>
            ))}
        </div>
        <div className="md:col-start-6 md:col-span-7 sm-only:mb-4">
          {gallery && gallery.galleryRef && (
            <ProjectGallery data={gallery} className="col-span-8 grid" />
          )}
        </div>
      </div>
    </div>
  )
}

export const exhibitionQuery = graphql`
  query ($id: String) {
    sanityExhibition(id: { eq: $id }) {
      seo {
        description
        title
        image {
          ...Image
        }
      }
      curator
      date(formatString: "YYYY")
      id
      isSolo
      location
      content {
        _key
        header
        body {
          _rawText
        }
      }
      gallery {
        ...gallery
      }
      title
      venue
    }
    allSanityExhibition(sort: { order: DESC, fields: date }) {
      edges {
        next {
          slug {
            current
          }
        }
        previous {
          slug {
            current
          }
        }
        node {
          id
          slug {
            current
          }
        }
      }
    }
  }
`
