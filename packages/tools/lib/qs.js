import { isNull, isUndefined, flatten } from 'lodash'
import { isEmptyString } from './types'

/**
 * 将query字符串变成对象
 * @param  {String} [queryString] query字符串
 * @return {Object}             query对象
 * @example
 *
 * queryParse()
 * // => {}
 *
 * @example
 *
 * queryParse('')
 * // => {}
 *
 * @example
 *
 * queryParse('?')
 * // => {}
 *
 * @example
 *
 * queryParse('?a')
 * // => { a: null }
 *
 * @example
 *
 * queryParse('?a=1')
 * // => { a: '1' }
 *
 * @example
 *
 * queryParse('a=1')
 * // => { a: '1' }
 *
 * @example
 *
 * queryParse('a=true')
 * // => { a: 'true' }
 *
 * @example
 *
 * queryParse('a=1&b')
 * // => { a: '1', b: null }
 *
 * @example
 *
 * queryParse('a=1&b=2')
 * // => { a: '1', b: '2' }
 *
 * @example
 *
 * queryParse('a=1&b&c')
 * // => { a: '1', b: null, c: null }
 *
 * @example
 *
 * queryParse('a=1&b=2&c&d=2&d=3')
 * // => { a: '1', b: '2', c: null, d: ['2', '3'] }
 *
 * @example
 *
 * queryParse('a=1&b=2&c&d=2&d=3&d')
 * // => { a: '1', b: '2', c: null, d: ['2', '3', null] }
 */
export const queryParse = (queryString = '') => {
  let query
  if (queryString.startsWith('?')) {
    query = queryString.substring(1)
  } else {
    query = queryString
  }
  if (isEmptyString(query)) {
    return {}
  }
  return query.split('&').reduce((prev, cur) => {
    const [k, v = null] = cur.split('=')
    const val = isNull(v) ? v : decodeURIComponent(v)
    if (isUndefined(prev[k])) {
      prev[k] = val
    } else {
      prev[k] = flatten([prev[k], val])
    }
    return prev
  }, {})
}

/**
 * 将对象变成query字符串
 * @param  {Object} [params] query对象
 * @return {String}        query字符串
 * @example
 * queryStringify()
 * // => ''
 *
 * @example
 * queryStringify(null)
 * // => ''
 *
 * @example
 * queryStringify({})
 * // => ''
 *
 * @example
 * queryStringify({ a: 1 })
 * // => 'a=1'
 *
 * @example
 * queryStringify({ a: '1' })
 * // => 'a=1'
 *
 * @example
 * queryStringify({ a: 1, b: 2 })
 * // => 'a=1&b=2'
 *
 * @example
 * queryStringify({ a: 1, b: null })
 * // => 'a=1&b'
 *
 * @example
 * queryStringify({ a: 1, b: null, c: null })
 * // => 'a=1&b&c'
 *
 * @example
 * queryStringify({ a: 1, b: undefined, c: null })
 * // => 'a=1&c'
 *
 * @example
 * queryStringify({ a: true })
 * // => 'a=true'
 *
 * @example
 * queryStringify({ a: true, b: false })
 * // => 'a=true&b=false'
 *
 * @example
 * queryStringify({ a: 1, b: 2, c: null, d: [2, 3] })
 * // => 'a=1&b=2&c&d=2&d=3'
 *
 * @example
 * queryStringify({ a: 1, b: 2, c: null, d: [2, undefined, 3, null] })
 * // => 'a=1&b=2&c&d=2&d=3&d'
 */
export const queryStringify = (params = {}) => {
  return Object.entries(params || {})
    .reduce((prev, cur) => {
      const [k, v] = cur
      if (isUndefined(v)) {
        return prev
      }
      if (isNull(v)) {
        prev.push(k)
      } else {
        const list = flatten([v])
          .filter(v2 => {
            return !isUndefined(v2)
          })
          .map(v2 => {
            const val = encodeURIComponent(v2)
            return isNull(v2) ? k : [k, val].join('=')
          })
        prev.push(...list)
      }
      return prev
    }, [])
    .join('&')
}
