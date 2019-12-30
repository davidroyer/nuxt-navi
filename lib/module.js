/* eslint-disable no-console */
import path, { resolve } from 'path'
import glob from 'glob'
import * as utils from './utils'

module.exports = function (moduleOptions) {
  let navFromPages

  const options = {
    autoNav: false,
    ...this.options.navi,
    ...moduleOptions
  }

  if (options.autoNav) {
    const pagesPath = path.join(this.options.srcDir, this.options.dir.pages)

    const pageRoutes = glob.sync('**/*.vue', {
      cwd: pagesPath
    })

    navFromPages = pageRoutes.map((route) => {
      if (route === 'index.vue') { return homeHandler(route) }

      const routePath = route.replace('.vue', '').replace('/index', '')
      const nonSluggedRoute = utils.unhyphenate(routePath.replace('.vue', ''))
      const title = utils.createTitle(nonSluggedRoute)

      return {
        title,
        path: routePath
      }
    })
  }

  /**
   * Adds the main plugin
   */
  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.js'),
    fileName: 'nuxt-navi.js',
    options: { ...options, nav: navFromPages }
  })

  /**
   * Extends the build by doing 2 things:
   * 1. Setting up an alias that can be used in `templates/plugins.js` to
   *    retrieve the file used to setup the user's navigations routes.
   * 2. Adds the `js-yaml-loader`
   */

  if (!options.autoNav) {
    console.log('SHOULD SHOW IF NOT USING AUTONAV')
  }

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

const homeHandler = (route) => {
  return {
    title: 'Home',
    path: '/'
  }
}

module.exports.meta = require('../package.json')
