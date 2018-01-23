/* eslint-disable */
export const getParameterByName = function (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  // name = name.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const debounce = function (fn, delay = 100) {
  let timer

  return function () {
    let context = this
    let args = arguments

    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

export const throttle = function (fn, threshhold = 250) {
  let last
  let timer

  return function () {
    let context = this
    let args = arguments

    let now = Date.now()

    if (last && now < last + threshhold) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

export const px2rem = function (px) {
  const p = px.replace('px', '')
  return `${+p / 37.5}rem`
}
