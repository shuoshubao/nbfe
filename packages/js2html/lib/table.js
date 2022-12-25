import { isNumber, isUndefined, get, merge } from 'lodash'
import { createElement } from './createElement'

export const generateTable = (columns = [], data = []) => {
  const innerColumns = columns.filter(v => {
    const { visible } = v
    return isUndefined(visible) || Boolean(visible)
  })
  return createElement({
    tagName: 'table',
    attrs: {
      style: {
        'border-spacing': 0,
        'border-collapse': 'collapse'
      }
    },
    children: [
      {
        tagName: 'colgroup',
        children: innerColumns.map(v => {
          const attrs = {}
          if ('width' in v) {
            const { width } = v
            attrs.width = isNumber(width) ? [width, 'px'].join('') : width
          }
          return {
            tagName: 'col',
            attrs
          }
        })
      },
      {
        tagName: 'thead',
        children: [
          {
            tagName: 'tr',
            children: innerColumns.map(v => {
              const { label, align } = v
              const attrs = {}
              if (align) {
                merge(attrs, {
                  style: { textAlign: align }
                })
              }
              return {
                tagName: 'th',
                attrs,
                text: label
              }
            })
          }
        ]
      },
      {
        tagName: 'tbody',
        children: data.map(v => {
          return {
            tagName: 'tr',
            children: innerColumns.map(v2 => {
              const { prop, align } = v2
              const attrs = {}
              if (align) {
                merge(attrs, {
                  style: { textAlign: align }
                })
              }
              return {
                tagName: 'td',
                attrs,
                text: get(v, prop, '--')
              }
            })
          }
        })
      }
    ]
  })
}
