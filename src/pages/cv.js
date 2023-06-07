import React from 'react'
import slugify from 'slugify'
import { graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import RichText from '../components/RichText'
import RichTextSingle from '../components/RichTextSingle'
import Seo from '../components/Seo'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'

const CvPage = ({ data: { sanityCv: pageData } }) => {
  const {
    seo,
    awardsBody,
    awardsTitle,
    bibliographyTitle,
    commisionsTitle,
    download,
    downloadCVLabel,
    educationBody,
    educationTitle,
    exhibitionsTitle,
    exhibitionsBody,
    groupExhibitionsBody,
    groupExhibitionsBody2,
    groupExhibitionsTitle,
    headerImages,
    life,
    lifeTitle,
    permanentSiteCommissionsBody,
    publicCollectionsBody,
    publicCollectionsTitle,
    selectedBibliographyBody,
    selectedBibliographyBody2,
    title,
  } = pageData

  const navItems = [
    exhibitionsTitle,
    awardsTitle,
    publicCollectionsTitle,
    commisionsTitle,
    groupExhibitionsTitle,
    bibliographyTitle,
  ]

  const { isSmall, isMedium, atLarge } = useCurrentBreakpoint()

  return (
    <>
      <Seo {...seo} />
      <PageHeader
        images={headerImages}
        title={title}
        titleClasses="ml-[-4px] md:ml-[-12px]"
        index={Math.floor(Math.random() * headerImages.length)}
      />
      <div className="bg-black text-white">
        <div className="container lg:grid md:grid-cols-8 lg:grid-cols-3 pb-i pt-12 md:pt-b">
          {isSmall ||
            (isMedium && <CVNav items={navItems} className="pb-12" />)}
          <div className="lg:col-span-1 border-grey-b sm-only:border-t sm-only:pt-12">
            <div className="mb-10">
              <h3 className="f-7 mb-3 uppercase">{lifeTitle}</h3>
              <p className="f-6">{life}</p>
            </div>
            <div className="mb-r">
              <h3 className="f-7 mb-3 uppercase">{educationTitle}</h3>
              <RichTextSingle
                className="f-6"
                content={educationBody._rawText}
              />
            </div>
            <div className="border-t border-grey-b pt-r sm-only:mb-24">
              <p className="f-6">
                {downloadCVLabel}{' '}
                <a href={download.asset.url} className="link">
                  here
                </a>
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            {atLarge && <CVNav items={navItems} className="mb-r" />}
            <div
              className="lg:grid lg:grid-cols-2 mb-h "
              id={`${slugify(exhibitionsTitle, { lower: true })}`}
            >
              <div
                id={`${slugify(awardsTitle, { lower: true })}`}
                className="border-b border-grey-b pt-t mb-t col-span-2"
              ></div>
              <div className="mb-20 lg:mb-0">
                <h3 className="f-7 mb-4 lg:mb-1 uppercase">
                  {exhibitionsTitle}
                </h3>
                <RichText className="f-6" content={exhibitionsBody._rawText} />
              </div>
              <div className="sm-only:border-t sm-only:pt-t border-grey-b ">
                <h3 className="f-7 mb-4 lg:mb-1 uppercase">{awardsTitle}</h3>
                <RichText className="f-6" content={awardsBody._rawText} />
              </div>
            </div>

            <div
              className="lg:grid grid-cols-2 border-grey-b mb-h"
              id={`${slugify(publicCollectionsTitle, { lower: true })}`}
            >
              <div
                className="border-b pt-t mb-t col-span-2"
                id={`${slugify(commisionsTitle, { lower: true })}`}
              ></div>
              <div className="mb-20 lg:mb-0">
                <h3 className="f-7 mb-4 lg:mb-1 uppercase">
                  {publicCollectionsTitle}
                </h3>
                <RichText
                  className="f-6"
                  content={publicCollectionsBody._rawText}
                />
              </div>
              <div className="sm-only:border-t sm-only:pt-t border-grey-b ">
                <h3 className="f-7 mb-4 lg:mb-1 uppercase">
                  {commisionsTitle}
                </h3>
                <RichText
                  className="f-6"
                  content={permanentSiteCommissionsBody._rawText}
                />
              </div>
            </div>

            <div className="border-grey-b mb-h">
              <div
                className="border-b pt-t mb-t"
                id={`${slugify(groupExhibitionsTitle, { lower: true })}`}
              ></div>
              <h3 className="f-7 mb-4 uppercase">{groupExhibitionsTitle}</h3>
              <div className="lg:grid grid-cols-2 f-6">
                <RichText
                  content={groupExhibitionsBody._rawText}
                  className="mb-10 lg:mb-0"
                />
                <RichText content={groupExhibitionsBody2._rawText} />
              </div>
            </div>

            <div className="border-grey-b">
              <div
                className="border-b pt-t mb-t"
                id={`${slugify(bibliographyTitle, { lower: true })}`}
              ></div>
              <h3
                id={`${slugify(bibliographyTitle, { lower: true })}`}
                className="f-7 mb-4 uppercase"
              >
                {bibliographyTitle}
              </h3>
              <div className="lg:grid grid-cols-2 f-6">
                <RichText
                  content={selectedBibliographyBody._rawText}
                  className="mb-10 lg:mb-0"
                />
                <RichText content={selectedBibliographyBody2._rawText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CvPage

export const query = graphql`
  query cvQuery {
    sanityCv {
      seo {
        title
        description
        image {
          ...Image
        }
      }
      awardsBody {
        _rawText
      }
      awardsTitle
      bibliographyTitle
      download {
        asset {
          url
        }
      }
      downloadCVLabel
      educationBody {
        _rawText
      }
      educationTitle
      exhibitionsTitle
      exhibitionsBody {
        _rawText
      }
      groupExhibitionsBody {
        _rawText
      }
      groupExhibitionsBody2 {
        _rawText
      }
      groupExhibitionsTitle
      headerImages {
        ...ImageWithPreview
      }
      life
      lifeTitle
      commisionsTitle
      permanentSiteCommissionsBody {
        _rawText
      }
      publicCollectionsBody {
        _rawText
      }
      publicCollectionsTitle
      selectedBibliographyBody {
        _rawText
      }
      selectedBibliographyBody2 {
        _rawText
      }
      title
    }
  }
`

const CVNav = ({ items, className }) => (
  <nav className={className}>
    <ul className="md:flex flex-wrap -mb-8">
      {items.map((item, i) => (
        <li className="mb-6 md:mb-3">
          <a
            href={`#${slugify(item, { lower: true })}`}
            className={`block f-7  ${i < items.length - 1 ? ' mr-2' : ''}`}
          >
            <span
              className={`
                          inline-block uppercase md:border-white hover:underline
                          ${i < items.length - 1 ? 'md:pr-2 md:border-r-2' : ''}
                        `}
              style={{ lineHeight: '1' }}
            >
              {item}
            </span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
)
