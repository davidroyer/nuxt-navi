/* eslint-disable no-console */
/* eslint-disable quotes */

import slugify from '@sindresorhus/slugify'

import nav from '@naviConfig'
console.log("TCL: nav with @naviConfig", nav)

const options = <%= JSON.stringify(options, null, 2) %>;

export default function ({ router, store }) {
  // const {nav} = require(`@/${options.src}`)
  if (!store) {
    throw new Error("Please provide vuex store.")
  }
  // register your own vuex module
  // store.registerModule({ states, mutations, actions })
  store.state.nav = buildNav(nav)
}

const buildNav = (nav) => {
  return nav.map((item) => {
    if (!item.path) { item.path = `/${slugify(item.title)}` }
    return item
  })
}
