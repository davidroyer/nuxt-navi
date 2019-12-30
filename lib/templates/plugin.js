/* eslint-disable no-console */
// eslint-disable no-unused-vars

import slugify from '@sindresorhus/slugify'
// import navConfig from '@naviConfig'

const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default function (ctx, inject) {
  const { store } = ctx
  let nav

  if (options.autoNav) {
    nav = options.nav
  } else {
    const navConfig = require('@naviConfig')
    nav = buildNav(navConfig)
  }

  if (!store) {
    throw new Error('Please provide vuex store.')
  }

  const navModule = {
    state: () => nav,
    getters: {
      nav: state => state
    }
  }

  store.registerModule('nav', navModule, {
    preserveState: Boolean(store.state.nav)
  })

  ctx.nav = nav
  inject('nav', nav)
}

/**
 * Builds the nav
 * @param {Array} nav The original nav data
 * @returns {Array} An array of objects
 */
const buildNav = (nav) => {
  return nav.map((item) => {
    if (!item.path) { item.path = `/${slugify(item.title)}` }
    return item
  })
}
