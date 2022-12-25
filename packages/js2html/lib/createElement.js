import { generateElement } from './config'

export const createElement = options => {
  const { tagName = '', attrs = {}, text = '', children = [] } = options
  // 文本节点
  if (typeof options === 'string') {
    return options
  }
  // 文本节点
  if (tagName === '') {
    return text
  }
  // 无子元素
  if (children.length === 0) {
    return generateElement(tagName, attrs, text)
  }
  // 有子元素
  return generateElement(
    tagName,
    attrs,
    children
      .map(v => {
        return createElement(v)
      })
      .join('')
  )
}
