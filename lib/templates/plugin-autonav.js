/* eslint-disable no-console */
// eslint-disable no-unused-vars

const options = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default function (ctx, inject) {
  console.log('USING PLUGIN-AUTONAV')

  const { store } = ctx
  const nav = options.nav

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
