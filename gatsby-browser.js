/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { ContextProvider } from './src/context'
import Layout from './src/components/Layout'
import './src/styles/global.css'

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

//
// export const shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition,
// }) => {
//   console.log(location)

//   // // hack to override `shouldUpdateScroll` behavior to bypass useQueryParams in news
//   // if (
//   //   location.search.includes('category=') ||
//   //   location.search.includes('page=')
//   // ) {
//   //   return false
//   // }
//   const currentPosition = getSavedScrollPosition(location)
//   console.log(currentPosition)
//   // return currentPosition || [0, 0]
//   return false
// }
