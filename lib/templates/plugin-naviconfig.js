/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import slugify from '@sindresorhus/slugify'
import navConfig from '@naviConfig'

const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default function (ctx, inject) {
  console.log('USING PLUGIN-NAVICONFIG')

  const { store } = ctx
  const nav = buildNav(navConfig)

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
