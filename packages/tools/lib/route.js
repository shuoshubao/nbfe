import { pick, isNil } from 'lodash'
import { isEmptyObject, isEmptyValue } from './types'
import { queryParse, queryStringify } from './qs'

/**
 * 获取参数
 * @param  {String} str query字符串
 * @param  {String} key query的key
 * @return {String|Object}     完整的query对象或者单个的query值
 * @example
 *
 * getParams('a=1&b=2&c&d=2&d=3')
 * // => { a: '1', b: '2', c: null, d: ['2', '3'] }
 *
 * @example
 *
 * getParams('a=1&b=2&c&d=2&d=3', 'a')
 * // => '1'
 */
export const getParams = (str, key) => {
  const params = queryParse(str)
  if (isEmptyValue(key)) {
    return params
  }
  return params[key]
}

/**
 * 获取 search 参数
 * @param  {String} key key值
 * @return {String|Object}    传key时返回字符串; 不传key时, 则返回所有query参数的json
 * @example
 *
 * // 假设当前的url为 http://aa.com/abc/d?a=1&b=2
 * search()
 * // => { a: '1', b: '2' }
 *
 * search('a')
 * // => '1'
 */
export const search = (key = '') => {
  // 从hash里解析 search 参数 (router 模式)
  const [, str = ''] = (window.location.search || window.location.hash).split('?')
  return getParams(str, key)
}

/**
 * 拼接url
 * @param  {String} [url='']    基础url
 * @param  {Object} [params={}] query参数
 * @return {String}        拼接的完整url
 * @example
 *
 * stringifyUrl('', { a: 1 })
 * // => '?a=1'
 *
 * @example
 *
 * stringifyUrl('abc', { a: 1 })
 * // => 'abc?a=1'
 *
 * @example
 *
 * stringifyUrl('http://aa.com/abc/d', { a: 1 })
 * // => 'http://aa.com/abc/d?a=1'
 */
export const stringifyUrl = (url = '', params = {}) => {
  const args = Object.entries(params).reduce((prev, [k, v]) => {
    if (!isNil(v) && v !== '') {
      prev[k] = v
    }
    return prev
  }, {})
  if (isEmptyObject(args)) {
    return url
  }
  return [url, queryStringify(args)].join('?')
}

/**
 * 更新 url 某个参数
 * @param  {Object} params 新的query参数
 * @param  {String} url    基础url
 * @return {String}        更新query后的完整url
 * @example
 *
 * updateUrlQuery({ a: 1 }, '');
 * // => '?a=1'
 *
 * @example
 *
 * updateUrlQuery({ a: 2 }, 'http://aa.com/abc/d?a=1')
 * // => 'http://aa.com/abc/d?a=2'
 */
export const updateUrlQuery = (params = {}, url = '') => {
  const baseUrl = url.split('?')[0]
  const query = getParams(url.split('?')[1] || '')
  return stringifyUrl(baseUrl, { ...query, ...params })
}

/**
 * 跳转页面
 * @param  {String} url     基础url
 * @param  {Object} [params={}]  query参数
 * @param  {Object} [options={}] a链接的属性
 * @return {*}         跳转页面
 * @example
 *
 * linkTo('http://aa.com/abc/d', { a: 1 })
 * // => 打开页面 http://aa.com/abc/d?a=1
 *
 * @example
 *
 * linkTo('http://aa.com/abc/d', { a: 1 }, { target: '_blank' })
 * // => 新标签打开页面 http://aa.com/abc/d?a=1
 */
export const linkTo = (url = '', params = {}, options = {}) => {
  const defaultOptions = {
    target: '_self', // a 标签属性
    isNewTab: false, // 是否在新 Tab打开（窗口、tab页）
    rel: 'noreferrer', // a 标签属性
    download: '' // a 标签属性
  }
  const computedOptions = {
    ...defaultOptions,
    ...options
  }
  if (computedOptions.isNewTab) {
    computedOptions.target = '_blank'
  }
  const { target, rel, download } = computedOptions
  const href = stringifyUrl(url, params)
  const elmentA = document.createElement('a')
  elmentA.target = target
  elmentA.href = href
  if (rel) {
    elmentA.rel = rel
  }
  if (download) {
    if (download === true) {
      elmentA.setAttribute('download', '')
    } else {
      elmentA.setAttribute('download', download)
    }
  }
  elmentA.setAttribute('hidden', 'hidden')
  document.body.appendChild(elmentA)
  elmentA.click()
  document.body.removeChild(elmentA)
}

/**
 * 解析 url
 * @param  {String} [url=''] url字符串
 * @return {Object}     { 'protocol', 'host', 'pathname', 'port', 'search', 'hash', 'origin', 'hostname' }
 * @example
 *
 * parseUrl('http://aa.com/abc/d?a=1');
 * // => {"protocol": "http:", "host": "aa.com", "pathname": "/abc/d", "port": "", "search": "?a=1", "hash": "", "origin": "http://aa.com", "hostname": "aa.com"}
 */
export const parseUrl = (url = '') => {
  let elmentA = document.createElement('a')
  elmentA.href = url
  const result = pick(elmentA, ['protocol', 'host', 'pathname', 'port', 'search', 'hash', 'origin', 'hostname'])
  elmentA = null
  return result
}

/**
 * 获取完整 url
 * @param  {String} url 相对路径
 * @return {String}     完整的url
 * @example
 *
 * // 假设当前的url为 http://aa.com/abc/d?a=1&b=2
 * getFullUrl('/abc')
 * // => http://aa.com/abc
 */
export const getFullUrl = (url = '') => {
  if (!url) {
    return ''
  }
  let elmentA = document.createElement('a')
  elmentA.href = url
  const result = elmentA.href
  elmentA = null
  return result
}
