import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import RichTextSingle from '../components/RichTextSingle'
import RichText from '../components/RichText'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'

const FellowshipsPage = ({
  data: { sanityFellowships: pageData, allSanityFellow },
}) => {
  const {
    title,
    seo,
    headerImages,
    headerBodyLeft,
    headerBodyRight,
    recipientLabel,
  } = pageData

  const { nodes: fellows } = allSanityFellow
  return (
    <>
      <Seo {...seo} />
      <PageHeader
        images={headerImages}
        title={title}
        titleClasses="ml-[-6px] md:ml-[-21px]"
      />
      <div className="pt-8 md:pt-b bg-black text-white">
        <div className="container">
          <div className="lg:grid md:grid-cols-12 mb-p">
            <div className="col-span-6 xl:col-span-5 mb-10 lg:mb-0">
              <RichTextSingle
                className="f-27"
                content={headerBodyLeft._rawText}
              />
            </div>
            <div className="col-span-6 xl:col-span-5">
              <RichTextSingle
                className="f-27"
                content={headerBodyRight._rawText}
              />
            </div>
          </div>
          {/* Recipient */}
          {fellows.map(fellow => (
            <div className="border-t border-grey-b pt-3 pb-i">
              <h2 className="f-28">
                {fellow.year} {recipientLabel}
              </h2>
              <div className="md:grid md:grid-cols-12 mt-n">
                <div className="col-span-6 xl:grid xl:grid-cols-3">
                  <div className="col-span-3 xl:col-span-1 mb-12 xl:mb-0">
                    <div className="max-w-[300px]">
                      <GatsbyImage
                        className="aspect-w-1 aspect-h-1"
                        imgClassName="rounded-full"
                        image={fellow.avatar.asset.gatsbyImageData}
                        alt={'alt text'}
                      />
                    </div>
                  </div>
                  <div className="col-span-3 xl:col-span-2">
                    <div className="mb-q">
                      <h3 className="f-28">{fellow.title}</h3>
                    </div>
                    <div className="sm-only:mb-20">
                      <RichTextSingle
                        className="f-29 text-grey-d"
                        content={fellow.education._rawText}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-6 xl:col-span-5">
                  <RichTextSingle
                    className="f-6"
                    content={fellow.body._rawText}
                  />
                  {fellow.infoBody?._rawText && (
                    <>
                      <p className="f-6">–</p>
                      <RichText content={fellow.infoBody._rawText} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FellowshipsPage

export const query = graphql`
  query FellowshipsQuery {
    sanityFellowships {
      seo {
        title
        description
        image {
          ...Image
        }
      }
      title
      headerImages {
        ...ImageWithPreview
      }
      headerBodyLeft {
        _rawText
      }
      headerBodyRight {
        _rawText
      }
      recipientLabel
    }
    allSanityFellow(sort: { fields: year, order: DESC }) {
      nodes {
        year(formatString: "YYYY")
        title
        education {
          _rawText
        }
        body {
          _rawText
        }
        avatar {
          asset {
            gatsbyImageData(layout: FULL_WIDTH)
            metadata {
              dimensions {
                aspectRatio
              }
            }
          }
        }
        infoBody {
          _rawText
        }
        _key
      }
    }
  }
`
