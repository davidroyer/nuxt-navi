/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { readFileSync } from 'fs'
import path, { resolve } from 'path'
import yaml from 'js-yaml'
import slugify from '@sindresorhus/slugify'

module.exports = function (moduleOptions) {
  // const moduleConfigPath = resolve(this.options.srcDir, this.options.navi.src)
  const moduleConfigPath = path.join(this.options.srcDir, this.options.navi.src)
  const navContents = readFileSync(moduleConfigPath, 'utf8')
  const nav = yaml.safeLoad(navContents)

  const nuxtNav = buildNav(nav)

  const options = {
    ...this.options.navi,
    ...moduleOptions,
    nav: nuxtNav,
    moduleConfigPath,
    testOption: true
  }

  this.addPlugin({
    src: resolve(__dirname, 'templates/plugin.js'),
    fileName: 'nuxt-navi.js',
    options
  })

  this.extendBuild((config, ctx) => {
    config.resolve.alias['@naviConfig'] = path.join(this.options.srcDir, this.options.navi.src)
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader'
    })
  })
}

const buildNav = (nav) => {
  return nav.map((item) => {
    if (!item.path) { item.path = `/${slugify(item.title)}` }
    return item
  })
}

module.exports.meta = require('../package.json')
