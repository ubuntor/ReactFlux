export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const debounce = (func, wait, immediate = false) => {
  let timeout
  return function (...args) {
    const later = () => {
      timeout = null
      if (!immediate) {
        func.apply(this, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(this, args)
    }
  }
}
