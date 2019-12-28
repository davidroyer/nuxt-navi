import slugify from '@sindresorhus/slugify'
import nav from '@naviConfig'

// eslint-disable-next-line no-unused-vars
const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default function ({ router, store }) {
  if (!store) {
    throw new Error('Please provide vuex store.')
  }

  const navModule = {
    // namespaced: true,
    state: () => buildNav(nav),
    // state: () => ({
    //   nav: buildNav(nav),
    //   options
    // }),
    getters: {
      nav: state => state
    }
  }

  store.registerModule('nav', navModule, {
    preserveState: Boolean(store.state.nav)
  })
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
