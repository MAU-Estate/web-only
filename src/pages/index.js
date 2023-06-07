import React, { useRef } from 'react'
import { graphql, Link } from 'gatsby'
import { InView } from 'react-intersection-observer'

import Blockquote from '../components/Blockquote'
import Gallery from '../components/Gallery'
import GalleryHome from '../components/GalleryHome'
import RichTextSingle from '../components/RichTextSingle'
import Icon from '../components/Icon'
import Figure from '../components/Figure'
import Seo from '../components/Seo'

const IndexPage = ({ data: { sanityBio: pageData, sanityHomeCarousel } }) => {
  const {
    seo,
    bioCta,
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
  } = pageData

  const handleBioSectionChange = (inView, entry, color) => {
    const target = entry.target
    if (inView) {
      backgroundRef.current.style.setProperty('--homeBg', `var(--${color})`)
      target.classList.add('fadeSection--inView')
    } else {
      target.classList.remove('fadeSection--inView')
    }
  }

  const rootMargin = '-49.99% 0% -49.99%'
  const backgroundRef = useRef()

  return (
    <div className="bg-transparent">
      <div
        ref={backgroundRef}
        className="fixed inset-0 transition-colors duration-300"
        style={{ backgroundColor: 'var(--homeBg)' }}
      />
      <Seo {...seo} />

      {/* gallery */}
      <div className="w-full h-screen bg-black-b relative flex pt-24 pb-12">
        <div className="container--tight w-full h-full flex flex-1 relative">
          <GalleryHome theme="dark" slides={sanityHomeCarousel.slides} />
        </div>
      </div>

      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) =>
          handleBioSectionChange(inView, entry, 'white')
        }
        id="intro"
        className="container pt-e"
      >
        <div className="md:grid grid-cols-12 mb-g">
          <div className="col-span-9 mb-a3 ">
            <Figure image={section1.image1} className="mix-blend-multiply" />
          </div>
          <div className="sm-only:mb-9 col-start-1 col-span-6 xl:col-start-2 xl:col-span-4 fadeItem">
            <RichTextSingle
              className="f-12"
              content={section1.section1bodyLeft._rawText}
            />
          </div>
          <div className="col-start-7 col-span-6 xl:col-start-6 xl:col-span-4 fadeItem">
            <RichTextSingle
              className="f-12"
              content={section1.section1bodyRight._rawText}
            />
          </div>
        </div>
      </InView>

      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) =>
          handleBioSectionChange(inView, entry, 'black-b')
        }
        className="py-g text-white fadeItem"
      >
        <div className="container">
          <div className="md:grid grid-cols-12">
            <div className="sm-only:mb-14 col-span-6 xl:col-span-5 ">
              <Gallery
                slides={section2.gallery1.galleryRef.images}
                slug={section2.gallery1.galleryRef.slug}
              />
            </div>
            <div className="xl:col-start-7 col-span-6 xl:col-span-5">
              <RichTextSingle
                className="f-13"
                content={section2.richText1._rawText}
              />
            </div>
          </div>
        </div>

        <Gallery
          slides={section2.gallery2.galleryRef.images}
          slug={section2.gallery2.galleryRef.slug}
          className="py-e"
          full={true}
        />

        <div className="container md:grid grid-cols-12">
          <div className="col-start-5 col-span-7 xl:col-start-7 xl:col-span-5 text-white mb-e">
            <RichTextSingle
              className="f-13"
              content={section2.richText2._rawText}
            />
          </div>
          <div className="col-span-10 col-start-2 xl:col-start-2 xl:col-span-8 text-white">
            <Blockquote quote={section2.quote1} />
          </div>
        </div>

        <div className="container md:grid grid-cols-12">
          <div className="col-start-1 col-end-13 lg:col-start-2 lg:col-end-12">
            <Gallery
              slides={section2.gallery3.galleryRef.images}
              slug={section2.gallery3.galleryRef.slug}
              className="py-e"
            />
          </div>
        </div>
      </InView>

      {/* Section 3 */}
      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) =>
          handleBioSectionChange(inView, entry, 'white')
        }
        className="py-g fadeItem"
      >
        <div className="container grid grid-cols-1 md:grid-cols-12 mb-e">
          <div className="sm-only:order-1 md:col-start-1 md:col-end-7 xl:col-start-2 xl:col-end-7">
            <RichTextSingle
              className="f-13"
              content={section3.richText1._rawText}
            />
          </div>
          <div className="sm-only:mb-18 md:col-start-7 md:col-end-13 xl:col-start-8 xl:col-end-13">
            <Gallery
              slides={section3.gallery1.galleryRef.images}
              slug={section3.gallery1.galleryRef.slug}
              theme="light"
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e items-end">
          <div className="sm-only:mb-18 col-span-5">
            <Gallery
              slides={section3.gallery2.galleryRef.images}
              slug={section3.gallery2.galleryRef.slug}
              theme="light"
            />
          </div>
          <div className="col-start-6 col-end-13">
            <Gallery
              slides={section3.gallery3.galleryRef.images}
              slug={section3.gallery3.galleryRef.slug}
              theme="light"
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12">
          <div className="col-start-2 col-end-10 xl:col-start-2 xl:col-end-7">
            <RichTextSingle
              className="f-13"
              content={section3.richText2._rawText}
            />
          </div>
        </div>
      </InView>

      {/* Section 4 */}
      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) => {
          handleBioSectionChange(inView, entry, 'bio-a')
        }}
        className="py-g text-white fadeItem"
      >
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="sm-only:mb-18 col-span-5 ">
            <Gallery
              slides={section4.gallery1.galleryRef.images}
              slug={section4.gallery1.galleryRef.slug}
            />
          </div>
          <div className="col-start-7 col-end-13">
            <RichTextSingle
              className="f-13"
              content={section4.richText1._rawText}
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12">
          <div className="col-start-2 col-end-12 xl:col-end-10">
            <Blockquote quote={section4.blockquote1} />
          </div>
        </div>
      </InView>

      {/* Section 5 */}

      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) => {
          handleBioSectionChange(inView, entry, 'white')
        }}
        className="BeringStrait py-g fadeItem"
      >
        <div className="container grid sm-only:grid-cols-1 grid-cols-12 mb-e">
          <div className="sm-only:order-1 md:col-start-2 md:col-end-7">
            <RichTextSingle
              className="f-13"
              content={section5.richText1._rawText}
            />
          </div>
          <div className="sm-only:mb-18 md:col-span-6">
            <Gallery
              slides={section5.gallery1.galleryRef.images}
              slug={section5.gallery1.galleryRef.slug}
              theme="light"
            />
          </div>
        </div>

        <Gallery
          slides={section5.gallery2.galleryRef.images}
          slug={section5.gallery2.galleryRef.slug}
          className="mb-e"
          theme="light"
          full
        />

        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-2 col-end-9 xl:col-end-7">
            <RichTextSingle
              className="f-13"
              content={section5.richText2._rawText}
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-1 col-end-12 xl:col-start-4 xl:col-end-12">
            <Blockquote quote={section5.blockquote1} />
          </div>
        </div>
        <div className="container md:grid grid-cols-12">
          <div className="col-start-2 col-span-10">
            <Gallery
              slides={section5.gallery3.galleryRef.images}
              slug={section5.gallery3.galleryRef.slug}
              theme="light"
            />
          </div>
        </div>
      </InView>

      {/* Section 6 */}
      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) => {
          handleBioSectionChange(inView, entry, 'bio-b')
        }}
        className="Guerilla py-g fadeItem"
      >
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-5 col-end-13 xl:col-start-7">
            <RichTextSingle
              className="f-13"
              content={section6.richText1._rawText}
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-2 col-span-10">
            <Gallery
              slides={section6.gallery1.galleryRef.images}
              slug={section6.gallery1.galleryRef.slug}
              theme="light"
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-1 col-end-12 xl:col-start-2 xl:col-end-10">
            <Blockquote quote={section6.blockquote1} />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-5 col-end-12 xl:col-start-7">
            <RichTextSingle
              className="f-13"
              content={section6.richText2._rawText}
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 items-end">
          <div className="sm-only:mb-18 col-span-5">
            <Gallery
              slides={section6.gallery2.galleryRef.images}
              slug={section6.gallery2.galleryRef.slug}
              theme="light"
            />
          </div>
          <div className="col-span-7">
            <Gallery
              slides={section6.gallery3.galleryRef.images}
              slug={section6.gallery3.galleryRef.slug}
              theme="light"
            />
          </div>
        </div>
      </InView>

      {/* Section 7 */}
      <InView
        as="section"
        root={null}
        rootMargin={rootMargin}
        onChange={(inView, entry) => {
          handleBioSectionChange(inView, entry, 'bio-c')
        }}
        className="py-g text-white fadeItem"
      >
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-2 col-span-7 xl:col-span-5">
            <RichTextSingle
              className="f-13"
              content={section7.richText1._rawText}
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-2 col-span-10">
            <Gallery
              slides={section7.gallery1.galleryRef.images}
              slug={section7.gallery1.galleryRef.slug}
            />
          </div>
        </div>
        <div className="container md:grid grid-cols-12 mb-e">
          <div className="col-start-3 col-end-12 xl:col-start-4 xl:col-end-11">
            <Blockquote quote={section7.blockquote1} />
          </div>
        </div>
        <div className="container md:grid grid-cols-12">
          <div className="sm-only:mb-18 col-start-1 xl:col-start-2 col-end-7">
            <RichTextSingle
              className="f-13"
              content={section7.richText2._rawText}
            />
          </div>
          <div className="col-start-8 col-span-5">
            <Gallery
              slides={section7.gallery2.galleryRef.images}
              slug={section7.gallery2.galleryRef.slug}
            />
          </div>
        </div>
      </InView>

      <Link to={bioCta.path} className="block relative py-e">
        <div className="absolute inset-0 flex">
          <Figure image={bioCta.image1} className="flex-1 flex" />
        </div>
        <div className="container">
          <div className="md:flex items-center text-white">
            <h2 className="f-14 sm-only:mb-4 max-w-md">{bioCta.title}</h2>
            <Icon name="arrowRight" className="h-15 w-15 text-white relative" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    sanityHomeCarousel {
      slides {
        ... on SanitySlide {
          _key
          _type
          url
          image {
            ...figure
          }
        }
        ... on SanityNewsSlide {
          _key
          _type
          title
          subhead
          url
          image {
            ...figure
          }
        }
      }
    }
    sanityBio {
      seo {
        title
        description
        image {
          ...Image
        }
      }
      section1 {
        section1bodyLeft {
          _rawText
        }
        section1bodyRight {
          _rawText
        }
        image1 {
          ...figure
        }
      }
      section2 {
        gallery1 {
          ...gallery
        }
        gallery2 {
          ...gallery
        }
        gallery3 {
          ...gallery
        }
        quote1 {
          ...blockquote
        }
        richText1 {
          _rawText
        }
        richText2 {
          _rawText
        }
      }
      section3 {
        gallery1 {
          ...gallery
        }
        gallery2 {
          ...gallery
        }
        gallery3 {
          ...gallery
        }
        richText1 {
          _rawText
        }
        richText2 {
          _rawText
        }
      }
      section4 {
        blockquote1 {
          ...blockquote
        }
        gallery1 {
          ...gallery
        }
        richText1 {
          _rawText
        }
      }
      section5 {
        blockquote1 {
          ...blockquote
        }
        gallery1 {
          ...gallery
        }
        gallery2 {
          ...gallery
        }
        gallery3 {
          ...gallery
        }
        richText1 {
          _rawText
        }
        richText2 {
          _rawText
        }
      }
      section6 {
        blockquote1 {
          ...blockquote
        }
        gallery1 {
          ...gallery
        }
        gallery2 {
          ...gallery
        }
        gallery3 {
          ...gallery
        }
        richText1 {
          _rawText
        }
        richText2 {
          _rawText
        }
      }
      section7 {
        blockquote1 {
          ...blockquote
        }
        gallery1 {
          ...gallery
        }
        gallery2 {
          ...gallery
        }
        richText1 {
          _rawText
        }
        richText2 {
          _rawText
        }
      }
      bioCta {
        title
        path
        image1 {
          ...figure
        }
      }
    }
  }
`
