import slugify from '@sindresorhus/slugify'
// import { nav } from '@/data/site/index.yml'

const transformNavData = nav => nav.map((item) => {
  if (!item.path) { item.path = `/${slugify(item.title)}` }
  return item
})

export default transformNavData
