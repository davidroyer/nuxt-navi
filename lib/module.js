import path, { resolve } from 'path'

module.exports = function (moduleOptions) {
  const options = {
    ...this.options.navi,
    ...moduleOptions,
    optionA: 'Value For OptionA'
  }

  /**
   * Adds the main plugin
   */
  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.js'),
    fileName: 'nuxt-navi.js',
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
      this.options.navi.src
    )

    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader'
    })
  })
}

module.exports.meta = require('../package.json')
