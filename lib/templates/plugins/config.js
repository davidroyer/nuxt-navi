/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import slugify from '@sindresorhus/slugify'
import navConfig from '@naviConfig'
import Vue from 'vue'

const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default function (ctx, inject) {
  const { store } = ctx
  const nav = buildNav(navConfig)

  const routeName = ctx.route.name
  // console.log('ctx.route', ctx.route)

  // console.log('TCL: HEAD', ctx.app.head)

  // if (process.client) {
  //   ctx.app.head.meta[0] = {
  //     hid: 'title',
  //     name: 'title',
  //     content: `${ctx.route.name} - TITLE FROM META middlware`
  //   }
  // }

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

  ctx.$nav = nav
  inject('nav', nav)

  ctx.$createSeo = () => buildSeo(ctx)
  inject('createSeo', () => buildSeo(ctx))
}

/**
 * Builds the `head` object for the route
 * @param {Object} ctx The Nuxt `context`
 */
const buildSeo = (ctx) => {
  console.log('createSeo via buildSeo -> ctx', ctx)
  const currentRoute = ctx.$nav.find(navRouteObject => navRouteObject.path === ctx.route.path)
  return {
    title: `${currentRoute.title} - TITLE SET FROM MODULE`,
    meta: [
      { hid: 'description', name: 'description', content: `CONTENT SET FROM MODULE for ${currentRoute.title}` }
    ]
  }
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
