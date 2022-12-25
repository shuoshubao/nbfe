import { cloneDeep, isEqual } from 'lodash'

/**
 * memoize/cache
 * @param  {Function} fn     缓存的函数
 * @return {Function}        包装的函数
 * @example
 *
 * const add = (a, b) => {
 *   return a + b;
 * }
 *
 * const memoizedAdd = memoizeOne(add);
 *
 * memoizedAdd(1, 2) // 3
 * memoizedAdd(1, 2) // 3
 */
export const memoize = fn => {
  const caches = []
  const memoized = (...args) => {
    const newArgs = cloneDeep(args)
    const item = caches.find(v => {
      return isEqual(v.args, newArgs)
    })
    if (item) {
      return item.data
    }
    const data = fn(...newArgs)
    caches.unshift({
      args: newArgs,
      data
    })
    return data
  }
  memoized.clear = () => {
    caches.splice(0, Infinity)
  }
  return memoized
}
