/* eslint-disable no-console */
export default function (ctx) {
  ctx.app.head.meta[0] = {
    hid: 'title',
    name: 'title',
    content: `${ctx.route.name} - TITLE FROM META middlware`
  }
}
