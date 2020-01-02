/* eslint-disable no-console */
import path, { resolve } from 'path'

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

    this.addPlugin({
      src: resolve(__dirname, 'templates/plugins/auto.js'),
      fileName: 'nuxt-navi-auto.js',
      options: { ...options, pagesPath }
    })
  }

  if (!options.autoNav) {
    this.addPlugin({
      src: resolve(__dirname, 'templates/plugins/config.js'),
      fileName: 'nuxt-navi-config.js',
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
