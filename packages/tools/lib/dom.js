/* eslint-disable no-use-before-define */

import { kebabCase, isNumber, isObject, flattenDeep, uniq, last } from 'lodash'
import { isEmptyObject } from './types'

/**
 * 给元素批量设置属性
 * @param  {HTMLElement} element   dom元素
 * @param  {Object} [attrs] 属性
 * @return {*}       undefined
 * @example
 *
 * setAttrs(eDiv, { id: 1, class: 'abc' })
 * // => <div id="1" class="abc"></div>
 */
export const setAttrs = (element, attrs = {}) => {
  Object.entries(attrs).forEach(([k, v]) => {
    element.setAttribute(k, v)
  })
}

/**
 * 下载 blob
 * @param  {*} blob    blob数据
 * @param  {Object} [options] a链接的属性
 * @return {*}       undefined
 * @example
 *
 * downloadBlob(blobData, { download: 'demo.png' })
 * // => 浏览器下载文件
 */
export const downloadBlob = (blob, options = {}) => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(blob)
  fileReader.onload = e => {
    const elmentA = document.createElement('a')
    const href = e.target.result
    setAttrs(elmentA, { ...options, href })
    document.body.appendChild(elmentA)
    elmentA.click()
    document.body.removeChild(elmentA)
  }
}

/**
 * 下载文件
 * @param  {String} url    文件地址
 * @param  {Object} config a 链接的属性
 * @return {*}       undefined
 * @example
 *
 * download('https://github.githubassets.com/favicons/favicon.png', { download: 'favicon.ico' })
 * // => 浏览器下载文件
 */
export const download = (url = '', config = {}) => {
  const elmentA = document.createElement('a')
  document.body.append(elmentA)
  const downloadFileName = last(url.split('/'))
  setAttrs(elmentA, {
    href: url,
    download: downloadFileName,
    target: '_blank',
    rel: 'noopener noreferrer',
    ...config
  })
  setStyle(elmentA, {
    display: 'none !important'
  })
  elmentA.click()
  document.body.removeChild(elmentA)
}

// 当值为数字时, 加上单位 `px` 的css属性
const DefaultUnitsPxProperties = ['font-size', 'margin', 'padding', 'border']

// margin, padding, border
;['top', 'right', 'bottom', 'left'].forEach(v => {
  DefaultUnitsPxProperties.push(v)
  DefaultUnitsPxProperties.push(['margin', v].join('-'))
  DefaultUnitsPxProperties.push(['padding', v].join('-'))
  DefaultUnitsPxProperties.push(['border', v, 'width'].join('-'))
})

// max min
;['width', 'height'].forEach(v => {
  DefaultUnitsPxProperties.push(v)
  DefaultUnitsPxProperties.push(['max', v].join('-'), ['min', v].join('-'))
})

/**
 * 给cssom加上单位px
 * @param  {Object} [cssom] css 对象
 * @return {Object}       带有'px'单位的 cssom
 * @example
 *
 * convertCssom({ width: 100, height: 200 })
 * // => { width: '100px', height: '200px' }
 *
 * @example
 *
 * convertCssom({ width: 100, minHeight: 100, marginTop: 10, paddingBottom: 10 })
 * // => { width: '100px', 'min-height': '100px', 'margin-top': '10px', 'padding-bottom': '10px' }
 */
export const convertCssom = (cssom = {}) => {
  return Object.entries(cssom).reduce((prev, [k, v]) => {
    const key = kebabCase(k)
    // 对于一些特定属性, 当值为数字时, 加上单位 px
    if (isNumber(v) && DefaultUnitsPxProperties.includes(key)) {
      prev[key] = `${v}px`
    } else {
      prev[key] = v
    }
    return prev
  }, {})
}

/**
 * 给元素批量设置样式
 * @param  {HTMLElement} element   dom元素
 * @param  {StyleSheet} cssom   cssom
 * @return {*}       undefined
 * @example
 *
 * setStyle(eDiv, { width: 100, color: 'red' })
 * // => <div style="width: 100px; color: red;"></div>
 */
export const setStyle = (element, cssom) => {
  const computedCssom = convertCssom(cssom)
  Object.entries(computedCssom).forEach(([k, v]) => {
    element.style[k] = v
  })
}

/**
 * 获取 cssText
 * @param  {StyleSheet} cssom   cssom
 * @return {String}       cssText 字符串
 * @example
 *
 * getCssText({ width: 100, color: 'red' })
 * // => 'width: 100px; color: red;'
 */
export const getCssText = (cssom = {}) => {
  if (isEmptyObject(cssom)) {
    return ''
  }
  const computedCssom = convertCssom(cssom)
  const cssText = Object.entries(computedCssom)
    .reduce((prev, [k, v]) => {
      prev.push([k, v].join(': '))
      return prev
    }, [])
    .join('; ')
  return [cssText, ';'].join('')
}

/**
 * 获取字符串在浏览器中所占的长度
 * @param  {String} word  字符串
 * @param  {StyleSheet} cssom   cssom
 * @return {Number}       字符串在浏览器中所占的长度
 *
 * @example
 * getWordWidth('四个汉字')
 * // => 56
 *
 * @example
 * getWordWidth('汉字abc123')
 * // => 78
 */
export const getWordWidth = (word = '', cssom = {}) => {
  const eleSpan = document.createElement('span')
  const defaultCssom = { visibility: 'hidden', whiteSpace: 'nowrap', fontSize: 14 }
  eleSpan.style.cssText = getCssText({
    ...defaultCssom,
    ...cssom
  })
  document.body.appendChild(eleSpan)
  eleSpan.innerText = word
  const width = eleSpan.offsetWidth
  document.body.removeChild(eleSpan)
  return Math.ceil(Number.parseFloat(width))
}

/**
 * 复制文本
 * @param  {*} text   要复制的文本
 * @return {*}       undefined
 * @example
 *
 * copyText('abc')
 * // => 复制内容到粘贴板
 *
 * @example
 *
 * copyText('abc\n123')
 * // => 复制内容到粘贴板
 */
export const copyText = (text = '') => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

/**
 * classNames
 * @see https://www.npmjs.com/package/classnames
 * @param  {...*} args   每个className的描述
 * @return {String}       className 字符串
 * @example
 *
 * classNames('foo', 'bar')
 * // => 'foo bar'
 *
 * @example
 *
 * classNames('foo', { bar: true })
 * // => 'foo bar'
 *
 * @example
 *
 * classNames({ 'foo-bar': true })
 * // => 'foo-bar'
 *
 * @example
 *
 * classNames({ 'foo-bar': false })
 * // => ''
 *
 * @example
 *
 * classNames({ foo: true }, { bar: true })
 * // => 'foo bar'
 *
 * @example
 *
 * classNames({ foo: true, bar: true })
 * // => 'foo bar'
 */
export const classNames = (...args) => {
  const classNameList = []
  flattenDeep([args]).forEach(v => {
    if (isObject(v)) {
      Object.entries(v).forEach(([k2, v2]) => {
        if (v2) {
          classNameList.push(k2)
        }
      })
    } else {
      classNameList.push(String(v || '').trim())
    }
  })
  return uniq(classNameList.filter(Boolean)).join(' ')
}

/**
 * 给 className 加后缀
 * 适用于开发组件库时, 给className加作用域
 * @param  {String} [baseClassName='']   基准 ClassName
 * @param  {Object} [suffixConfig={}]   classNames 对象
 * @param  {Object} [config={separator: '-'}]   classNames 对象
 * @return {String}       className 字符串
 * @example
 *
 * suffixClassNames('table', { bordered: true, shadow: false })
 * // => 'table table-bordered'
 */
export const suffixClassNames = (baseClassName = '', suffixConfig = {}, config = {}) => {
  const computedConfig = {
    separator: '-',
    ...config
  }
  const classNameList = [baseClassName]
  Object.entries(suffixConfig).forEach(([k, v]) => {
    if (v) {
      classNameList.push([baseClassName, k].join(computedConfig.separator))
    }
  })
  return classNames(classNameList)
}
