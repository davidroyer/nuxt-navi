/* eslint-disable no-console */
import Vue from 'vue'
Vue.prototype.$navSeo = function () {
  console.log('this', this)

  console.log('Vue.prototype.$navSeo')
  // return 'SEO'
  return {
    title: `- TITLE SET FROM MODULE`,
    meta: [
      { hid: 'description', name: 'description', content: 'CONTENT SET FROM MODULE' }
    ]
  }
}
export default (nuxtContext) => {
  const { app } = nuxtContext
  app.i18n = new VueI18n({
    fallbackLocale: `en`,
    messages: { en, fr }
  })
}
