/* eslint-disable no-console */
/* eslint-disable quotes */
import slugify from '@sindresorhus/slugify'
import nav from '@naviConfig'

const options = `<%= JSON.stringify(options, null, 2) %>`
console.log("TCL: options", options)

export default function ({ router, store }) {
  if (!store) {
    throw new Error("Please provide vuex store.")
  }

  store.state.nav = buildNav(nav)
  store.state.naviOptions = options
}

/**
 * Builds the nav
 * @param {Array} nav
 */
const buildNav = (nav) => {
  return nav.map((item) => {
    if (!item.path) { item.path = `/${slugify(item.title)}` }
    return item
  })
}
