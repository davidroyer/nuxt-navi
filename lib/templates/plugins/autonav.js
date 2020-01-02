/* eslint-disable no-console */

const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default function (ctx, inject) {
  const { store } = ctx

  if (process.server) {
    const glob = require('glob')
    const pageRoutes = glob.sync('**/*.vue', {
      cwd: options.pagesPath
    })

    const nav = pageRoutes.map((pageRoute) => {
      if (pageRoute === 'index.vue') { return homeHandler(pageRoute) }

      const pageRoutePath = pageRoute.replace('.vue', '').replace('/index', '')
      const nonSluggedpageRoute = unhyphenate(pageRoutePath.replace('.vue', ''))
      const title = createTitle(nonSluggedpageRoute)

      return {
        title,
        path: pageRoutePath
      }
    })
    console.log('AutoNav -> nav', nav)

    const navPagesModule = {
      state: () => nav,
      getters: {
        nav: state => state
      }
    }

    store.registerModule('nav', navPagesModule, {
      preserveState: Boolean(store.state.nav)
    })
  }
}

const homeHandler = (route) => {
  return {
    title: 'Home',
    path: '/'
  }
}

export function unhyphenate (str) {
  return str.replace(/(\w)(-)(\w)/g, '$1 $3')
}

export const pickRouteName = route => route.slice(0, route.indexOf('/'))

export const createTitle = (title) => {
  title.slice(0, title.indexOf('/'))
  return title
    .split(/ /g)
    .map(word => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
    .join(' ')
}
