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
