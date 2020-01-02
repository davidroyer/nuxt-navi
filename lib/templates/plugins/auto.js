/* eslint-disable no-console */
const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

console.log('options pagesPath', options.pagesPath)

export default async function (ctx, inject) {
  const files = await require.context(`@/pages/`, true, /\.vue$/)
  const pageRoutes = files.keys().map(key => key.slice(2, -4))
  const nav = pageRoutes.map(pageRoute => pageRouteHandler(pageRoute))

  const navPagesModule = {
    state: () => nav,
    getters: {
      nav: state => state
    }
  }

  ctx.store.registerModule('nav', navPagesModule, {
    preserveState: Boolean(ctx.store.state.nav)
  })
  ctx.$auto = nav
  inject('auto', nav)
}

function pageRouteHandler (pageRoute) {
  if (pageRoute === 'index') { return homeHandler(pageRoute) }

  const pageRoutePath = pageRoute.replace('/index', '')
  const nonSluggedpageRoute = unhyphenate(pageRoutePath)
  const title = createTitle(nonSluggedpageRoute)

  return {
    title,
    path: pageRoutePath
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
