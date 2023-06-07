/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import Layout from './src/components/Layout'
import { ContextProvider } from './src/context'
import './src/styles/global.css'

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
