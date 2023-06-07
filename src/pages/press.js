import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import SanityImage from 'gatsby-plugin-sanity-image'

import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import Seo from '../components/Seo'

const PressPage = ({
  data: { sanityPress: pageData, allSanityArticle: articleNodes },
}) => {
  const { seo, title } = pageData
  const { nodes: articles } = articleNodes

  const articlesInRows = []
  const { isXl, isMedium, vw } = useCurrentBreakpoint()

  const chunkSize = isMedium && vw < 925 ? 2 : vw >= 925 && !isXl ? 3 : 4
  for (var i = 0; i < articles.length; i += chunkSize) {
    const chunk = articles.slice(i, i + chunkSize)
    articlesInRows.push(chunk)
  }

  return (
    <div className="container pt-25 pb-i">
      <Seo {...seo} />
      <Helmet bodyAttributes={{ class: 'theme--light' }} />
      <div className="mb-b md:pt-12 pb-3 lg:pb-a3 border-b border-grey-b flex justify-between items-end">
        <h1 className="f-5">{title}</h1>
      </div>

      {articlesInRows.map((row, i) => {
        return (
          <ul
            className={`grid md:grid-cols-2 work3:grid-cols-3 xl:grid-cols-4 sm-only:gap-y-o mb-o  ${
              i !== articlesInRows.length - 1
                ? 'md:pb-o md:border-b md:border-b-grey-b'
                : ''
            }`}
          >
            {row.map((article, i) => {
              const { id, external } = article
              // if (!article.external && !article.gallery) {
              //   return (
              //     <li
              //       key={id}
              //       className="relative sm-only:border-b border-grey-b sm-only:pb-o"
              //     >
              //       No gallery added for internal article {article.title}
              //       {(i === +0 || i !== row.length - 1) && (
              //         <div
              //           className={`absolute right-[-23px] top-0 bottom-0 md:border-r border-grey-b`}
              //         />
              //       )}
              //     </li>
              //   )
              // }
              return (
                <li
                  key={id}
                  className="relative sm-only:border-b border-grey-b sm-only:pb-o"
                >
                  {(i === +0 || i !== row.length - 1) && (
                    <div
                      className={`absolute right-[-23px] top-0 bottom-0 md:border-r border-grey-b`}
                    />
                  )}
                  {external ? (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {renderArticlePreview(article)}
                    </a>
                  ) : article.media[0]?.asset ? (
                    <a
                      href={`${article.media[0].asset.url}/${article.media[0].asset.originalFilename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {renderArticlePreview(article)}
                    </a>
                  ) : (
                    "You haven't added an image or pdf for the internal article"
                  )}
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}

const renderArticlePreview = ({
  previewImage,
  title,
  author,
  publication,
  date,
}) => (
  <>
    <div className="md:aspect-w-1 md:aspect-h-1 mb-a">
      {previewImage.asset ? (
        <SanityImage
          {...previewImage}
          alt={previewImage.alt}
          width={450}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <span>'preview image not added'</span>
      )}
    </div>
    <h3 className="f-26 mb-2">{title}</h3>
    <p className="f-26--light mb-k">{author}</p>
    <p className="f-8 mb-2">{publication}</p>
    {date && <p className="f-8">{date}</p>}
  </>
)

export default PressPage

export const query = graphql`
  query PressQuery {
    sanityPress {
      seo {
        title
        description
        image {
          ...Image
        }
      }
      title
    }
    allSanityArticle(sort: { order: DESC, fields: date }) {
      nodes {
        id
        author
        title
        external
        url
        publication
        previewImage {
          ...ImageWithPreview
        }
        date(formatString: "MMMM, YYYY")
        media {
          ... on SanityFile {
            asset {
              url
              originalFilename
            }
          }
          ... on SanityImage {
            asset {
              url
              originalFilename
            }
            _type
          }
        }
      }
    }
  }
`
