/* eslint-disable no-console */
import path, { resolve } from 'path'
// import glob from 'glob'
// import * as utils from './utils'

module.exports = function (moduleOptions) {
  const options = {
    autoNav: false,
    ...this.options.navi,
    ...moduleOptions
  }

  /**
   * Adds the autoNav version of the plugin
   */
  if (options.autoNav) {
    const pagesPath = path.join(this.options.srcDir, this.options.dir.pages)

    // const pageRoutes = glob.sync('**/*.vue', {
    //   cwd: pagesPath
    // })

    // const navFromPages = pageRoutes.map((route) => {
    //   if (route === 'index.vue') { return homeHandler(route) }

    //   const routePath = route.replace('.vue', '').replace('/index', '')
    //   const nonSluggedRoute = utils.unhyphenate(routePath.replace('.vue', ''))
    //   const title = utils.createTitle(nonSluggedRoute)

    //   return {
    //     title,
    //     path: routePath
    //   }
    // })

    // this.addPlugin({
    //   src: resolve(__dirname, 'templates/plugin-autonav.js'),
    //   fileName: 'autonav-nuxt-navi.js',
    //   options: { ...options, nav: navFromPages, pagesPath }
    // })

    this.addPlugin({
      src: resolve(__dirname, 'templates/plugin/autonav.js'),
      fileName: 'nuxt-navi-autonav.js',
      options: { ...options, pagesPath }
    })
  }

  if (!options.autoNav) {
    this.addPlugin({
      src: resolve(__dirname, 'templates/plugin-naviconfig.js'),
      fileName: 'autonav-nuxt-navi.js',
      options
    })

    /**
   * Extends the build by doing 2 things:
   * 1. Setting up an alias that can be used in `templates/plugins.js` to
   *    retrieve the file used to setup the user's navigations routes.
   * 2. Adds the `js-yaml-loader`
   */
    this.extendBuild((config, ctx) => {
      config.resolve.alias['@naviConfig'] = path.join(
        this.options.srcDir,
        this.options.navi.src || ''
      )

      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader'
      })
    })
  }
}

// const homeHandler = (route) => {
//   return {
//     title: 'Home',
//     path: '/'
//   }
// }

module.exports.meta = require('../package.json')
