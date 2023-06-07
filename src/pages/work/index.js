import React, { useState, useRef, useContext, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import SanityImage from 'gatsby-plugin-sanity-image'
import queryString from 'query-string'
import Masonry from 'react-masonry-css'

import { Context } from '../../context'
import useObserver from '../../hooks/useObserver'

import FilterList from '../../components/FilterList'
import Seo from '../../components/Seo'
import { useCurrentBreakpoint } from '../../hooks/useCurrentBreakpoint'
import Headroom from 'react-headroom'

const getFeaturedProjects = (featuredProjects, projects) => {
  const featuredIds = featuredProjects.map(project => project.id)
  return projects.filter(project => featuredIds.indexOf(project.id) !== -1)
}

const filterProject = (project, filters, type) => {
  const filterOptions = filters[type]

  // return true if this filter has no options attached
  if (!filterOptions || !filterOptions.length) return true

  const projectFilterTypeOptions =
    typeof project[type] === 'string' ? [project[type]] : project[type]

  if (!projectFilterTypeOptions || !projectFilterTypeOptions.length)
    return false

  if (typeof filterOptions === 'string') {
    return projectFilterTypeOptions
      .map(option => option.slug?.current || option)
      .includes(filterOptions)
  } else {
    return filterOptions.some(filter => {
      return projectFilterTypeOptions
        .map(option => option.slug?.current || option)
        .includes(filter)
    })
  }
}

// const getAvailableFilters = projects => {
//   const result = {
//     medium: [],
//     collection: [],
//     material: [],
//     era: [],
//   }
//   projects.forEach(project => {
//     if (project.medium) {
//       project['medium'].forEach(option => {
//         if (result.medium.indexOf(option) === -1) {
//           result.medium.push(option.slug.current)
//         }
//       })
//     }
//     if (project.era) {
//       const era = project.era
//       if (result.era.indexOf(era) === -1) {
//         result.era.push(era)
//       }
//     }
//     if (project.collection) {
//       project['collection'].forEach(option => {
//         if (result.collection.indexOf(option) === -1) {
//           result.collection.push(option.slug.current)
//         }
//       })
//     }
//     if (project.material) {
//       project['material'].forEach(option => {
//         if (result.material.indexOf(option) === -1) {
//           result.material.push(option.slug.current)
//         }
//       })
//     }
//   })
//   return result
// }

const getProjectYearsByDecade = years => {
  const decades = years.map(year => {
    const _year = Number(year)
    return (_year - (_year % 10)).toString()
  })
  const decadesSet = new Set(decades)
  return Array.from(decadesSet)
}

const getFiltersState = filters => {
  return (
    !!filters.medium?.length ||
    !!filters.era?.length ||
    !!filters.material?.length ||
    !!filters.collection?.length
  )
}

const Work = ({
  location,
  data: {
    sanityWork: { seo, title, featured },
    projects,
    materials,
    mediums,
    collections,
  },
}) => {
  const { setProjectEdges, setProjectFilterString } = useContext(Context)
  const { atMedium, atLarge, isSmall } = useCurrentBreakpoint()
  const [activeFilters, setActiveFilters] = useState(
    location.search
      ? queryString.parse(location.search, { arrayFormat: 'comma' })
      : {
          featured: 'false',
        }
  )

  const getFilteredProjects = filters => {
    const filterResult = []
    const filterRejects = []
    const featuredProjects =
      activeFilters.featured === 'true'
        ? getFeaturedProjects(featured, projects.nodes)
        : projects.nodes
    featuredProjects.forEach(project => {
      if (
        filterProject(project, filters, 'medium') &&
        filterProject(project, filters, 'collection') &&
        filterProject(project, filters, 'material') &&
        filterProject(project, filters, 'era')
      ) {
        filterResult.push(project)
      } else {
        filterRejects.push(project)
      }
    })
    return { filterResult, filterRejects }
  }

  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const { filterResult } = getFilteredProjects(activeFilters)
  const [filteredProjects, setFilteredProjects] = useState(filterResult)
  const hasFiltering = getFiltersState(activeFilters)

  useEffect(() => {
    setProjectEdges(filteredProjects)
  }, [filteredProjects, setProjectEdges])

  // Setting filter height for drawer animation
  const filterContainerRef = useRef()
  const filterRef = useRef()
  const [filterHeight, setFilterHeight] = useState(0)

  useObserver({
    callback: val => {
      setFilterHeight(val[0].contentRect.bottom)
    },
    element: filterRef,
  })

  const setUrlParams = state => {
    const params = queryString.stringify(state, { arrayFormat: 'comma' })
    const updatedUrl = location.pathname + '?' + params
    setProjectFilterString(`?${params}`)
    window.history.pushState({ path: updatedUrl }, '', updatedUrl)
  }

  const yearOptions = getProjectYearsByDecade(
    projects.nodes.map(project => project.era)
  )

  const handleResetFilters = () => {
    const defaultFilters = { featured: activeFilters.featured }
    setActiveFilters(defaultFilters)
    const { filterResult } = getFilteredProjects(defaultFilters)
    setFilteredProjects(filterResult)
    setUrlParams(defaultFilters)
  }

  const handleSetActiveFilter = (filter, value) => {
    const result = activeFilters
    result[filter] = value
    const { filterResult } = getFilteredProjects({ ...result })
    setFilteredProjects(filterResult)
    setActiveFilters({ ...result })
    setUrlParams({ ...result })
  }

  const isFeatured = activeFilters.featured === 'true'

  const renderFilterList = () => [
    <FilterList
      title="Medium"
      className="sm-only:mb-4"
      activeItems={activeFilters.medium}
      onSelect={filters => handleSetActiveFilter('medium', filters)}
      items={mediums.nodes}
    />,
    <FilterList
      title="Era"
      className="filterMd:ml-10 xl:ml-20 sm-only:mb-4"
      activeItems={activeFilters.era}
      onSelect={filters => handleSetActiveFilter('era', filters)}
      items={yearOptions.map(year => {
        return {
          label: year,
          slug: { current: year },
        }
      })}
    />,
    <FilterList
      title="Collection"
      activeItems={activeFilters.collection}
      className="filterMd:ml-10 xl:ml-20 sm-only:mb-4"
      onSelect={filters => handleSetActiveFilter('collection', filters)}
      items={collections.nodes}
    />,
    <FilterList
      title="Materials"
      activeItems={activeFilters.material}
      className="filterMd:ml-10 xl:ml-20"
      listClassName="grid grid-cols-2 gap-x-8"
      onSelect={filters => handleSetActiveFilter('material', filters)}
      items={materials.nodes}
    />,
  ]

  let pinStart = filterContainerRef?.current?.getBoundingClientRect().top || 0
  pinStart = pinStart + (isSmall ? 68 : 0)

  return (
    <div className="md:pt-25 relative">
      <Seo {...seo} />
      <Helmet bodyAttributes={{ class: 'theme--light' }} />
      <Headroom
        className="work-filter "
        pinStart={pinStart}
        disable={atMedium && isFilterVisible}
      >
        <div
          className="container bg-white sm-only:pb-2"
          ref={filterContainerRef}
        >
          <div className="pb-a3 md:pt-12 border-b border-grey-b flex justify-between items-end relative z-10 bg-white">
            <h1 className="f-5 xl:ml-[-9px]">{title}</h1>

            {/* radios */}

            <div className="flex uppercase">
              <div
                className={`radio relative cursor-pointer ${
                  !isFeatured ? 'f-16--medium' : 'f-16'
                }`}
              >
                <input
                  type="radio"
                  name="featuredFilter"
                  id="all"
                  className="absolute cursor-pointer opacity-0 h-full w-full"
                  onChange={() => handleSetActiveFilter('featured', 'false')}
                  checked={!isFeatured}
                />
                <label htmlFor="all">All</label>
              </div>
              <div className="mx-1 f-16">/</div>
              <div
                className={`radio relative cursor-pointer ${
                  isFeatured ? 'f-16--medium' : 'f-16'
                }`}
              >
                <input
                  type="radio"
                  name="featuredFilter"
                  id="featured"
                  className="absolute cursor-pointer opacity-0 h-full w-full"
                  onChange={() => handleSetActiveFilter('featured', 'true')}
                  checked={isFeatured}
                />
                <label htmlFor="featured">Featured</label>
              </div>
            </div>
            {atMedium && (
              <FilterButton
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                isVisible={isFilterVisible}
                hasFiltering={hasFiltering}
              />
            )}
          </div>
          {isSmall && (
            <div className="flex justify-between mt-6 items-center">
              <FilterButton
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                isVisible={isFilterVisible}
                hasFiltering={hasFiltering}
              />
              {isFilterVisible && (
                <div className="flex items-start">
                  <button
                    className={`${hasFiltering ? '' : 'text-grey-d'}`}
                    onClick={handleResetFilters}
                    disabled={!hasFiltering}
                  >
                    <div className="f-9--light uppercase">Reset Filters</div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filter */}
          <div
            ref={filterRef}
            className={`bg-white flex absolute container left-0 right-0 justify-between pt-j transition-opacity  ${
              isFilterVisible
                ? 'pointer-events-auto'
                : 'pointer-events-none opacity-0'
            }`}
          >
            {atLarge || isSmall ? (
              <div className="grid lg:gap-y-8 lg:grid-cols-3  filterMd:flex">
                {renderFilterList()}
              </div>
            ) : (
              <Masonry
                breakpointCols={2}
                className="projectFilter"
                columnClassName="projectFilter_column"
              >
                {renderFilterList()}
              </Masonry>
            )}
            {atMedium && (
              <div className="flex items-start flex-shrink-0 md:ml-8">
                <button
                  className={`${
                    hasFiltering ? '' : 'text-grey-d cursor-not-allowed'
                  }`}
                  onClick={handleResetFilters}
                  disabled={!hasFiltering}
                >
                  <div className="f-9--light uppercase">Reset Filters</div>
                </button>
              </div>
            )}
          </div>
        </div>
      </Headroom>
      <div
        className={`container transform transition-transform pointer-events-none`}
        style={{
          paddingBottom: `${isFilterVisible ? filterHeight : 0}px`,
          transform: `translateY(${isFilterVisible ? filterHeight : 0}px)`,
        }}
      >
        {filteredProjects && filteredProjects.length ? (
          <ul className="pointer-events-auto mt-b mb-e grid md:grid-cols-2 work3:grid-cols-3 gap-x-11 gap-y-h">
            {filteredProjects.map(
              (
                {
                  title,
                  slug,
                  yearText,
                  previewImage,
                  collection,
                  collectionsText,
                },
                i
              ) => {
                const collectionHasMuseum = collection.some(
                  item => item.slug.current === 'museum'
                )
                return (
                  <li key={slug.current}>
                    <Link to={slug.current} className="hover:underline">
                      <div className="md:aspect-h-1 md:aspect-w-1 mb-a3">
                        {previewImage.asset && (
                          <SanityImage
                            {...previewImage}
                            alt={previewImage.alt}
                            width={800}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        )}
                      </div>
                      <p className="f-17 mb-2">{title}</p>
                      <p className="f-17 font-italic">
                        {yearText}
                        {collectionHasMuseum && `, ${collectionsText}`}
                      </p>
                    </Link>
                  </li>
                )
              }
            )}
          </ul>
        ) : (
          <div className="pt-b mb-e f-6 pointer-events-auto">
            Your search returned no results<br></br>
            <button
              onClick={handleResetFilters}
              className="underline font-italic cursor-pointer hover:no-underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Work

export const workQuery = graphql`
  query workQuery {
    sanityWork {
      seo {
        title
        description
        image {
          ...Image
        }
      }
      title
      featured {
        id
      }
    }
    projects: allSanityProject(sort: { fields: date, order: DESC }) {
      nodes {
        title
        id
        date(formatString: "YYYY")
        yearText
        slug {
          current
        }
        era
        material {
          slug {
            current
          }
        }
        previewImage {
          alt
          ...ImageWithPreview
        }
        medium {
          slug {
            current
          }
        }
        collectionsText
        collection {
          slug {
            current
          }
        }
      }
    }
    materials: allSanityMaterial {
      nodes {
        label
        slug {
          current
        }
        id
      }
    }
    mediums: allSanityMedium {
      nodes {
        label
        slug {
          current
        }
        id
      }
    }
    collections: allSanityCollection {
      nodes {
        label
        slug {
          current
        }
        id
      }
    }
  }
`

const FilterButton = ({ className, onClick, isVisible, hasFiltering }) => (
  <button
    onClick={onClick}
    className={`
      rounded-md border border-black py-1 px-4
      ${hasFiltering ? 'bg-grey-e' : ''}
      ${className}
    `}
    style={{ width: '157px' }}
  >
    <span className="f-9 block py-[6px] uppercase">
      {isVisible ? 'Close' : 'Filter'}
    </span>
  </button>
)
