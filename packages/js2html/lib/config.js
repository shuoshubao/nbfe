import { isEqual, isPlainObject, isNumber, kebabCase } from 'lodash'

// https://www.npmjs.com/package/html-tags
// 自闭合标签
export const voidHtmlTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

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

// 给cssom加上单位px
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

// 获取 cssText
export const getCssText = (cssom = {}) => {
  if (isEqual(cssom, {})) {
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

// 属性
export const generateAttrsText = (attrs = {}) => {
  return Object.entries(attrs)
    .reduce((prev, [k, v]) => {
      let value = v
      // style
      if (k === 'style' && isPlainObject(v)) {
        value = getCssText(v)
      }
      prev.push([k, `"${value}"`].join('='))
      return prev
    }, [])
    .join(' ')
}

// 元素
export const generateElement = (tagName = '', attrs = {}, text = '') => {
  const attrsText = generateAttrsText(attrs)
  const startTag = `<${[tagName, attrsText].filter(Boolean).join(' ')}>`
  const endTag = `</${tagName}>`
  const isVoidTag = voidHtmlTags.includes(tagName)
  if (isVoidTag) {
    return startTag
  }
  return [startTag, text, endTag].join('')
}
