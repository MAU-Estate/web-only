// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  flags: {
    FAST_DEV: true,
    DEV_SSR: false,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          defaultQuality: 50,
          backgroundColor: `transparent`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        tailwind: true,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        prettier: true,
        svgo: true,
        replaceAttrValues: {
          '#000000': 'currentColor',
          '#000': 'currentColor',
        },
      },
    },
    `gatsby-plugin-modal-routing-3`,
    {
      resolve: 'gatsby-plugin-sanity-image',
      options: {
        ...clientConfig.sanity,
        customImageTypes: ['SanityPreviewImage', 'SanityFigure', 'SanitySlide'],
        defaultImageConfig: {
          quality: 35,
          maxWidth: 1000,
          fit: 'clip',
          auto: 'format',
        },
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `maryannunger.com`,
        short_name: `maryannunger`,
        description: 'Website for the estate of Mary Ann Unger.',
        start_url: `/`,
        background_color: `#1f1f1f`,
        theme_color: `#1f1f1f`,
        display: `minimal-ui`,
        icon: 'src/assets/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
}
