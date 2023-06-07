module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-modal-routing-3/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"maryannunger.com","short_name":"maryannunger","description":"Website for the estate of Mary Ann Unger.","start_url":"/","background_color":"#1f1f1f","theme_color":"#1f1f1f","display":"minimal-ui","icon":"src/assets/images/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"8efefec3712e1b7c70cfec4d629691c7"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
