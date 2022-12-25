import { get, isPlainObject } from 'lodash'
import { isEmptyValue } from './types'

/**
 * 通过 value 获取 label
 * @param  {*} value     value 值
 * @param  {Array}  [data=[{ value, label }]]      数据源
 * @param  {String} [emptyText='--'] 空值
 * @return {String}           value对应的label
 * @example
 *
 * const data = [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
 * getLabelByValue(5, data)
 * // => '优秀'
 *
 * @example
 * getLabelByValue('5', data)
 * // => '优秀'
 *
 * @example
 * getLabelByValue(null, data)
 * // => '--'
 *
 * @example
 * getLabelByValue(null, data, '暂无')
 * // => '暂无'
 */
export const getLabelByValue = (value, data = [], emptyText = '--') => {
  const item = data.find(v => String(v.value) === String(value))
  if (item) {
    return item.label
  }
  return emptyText
}

/**
 * 将 json 转换成 [{ value, label }]
 * @param  {Object} [data={}] json数据
 * @return {Array}      标准的枚举数据格式 [{ value, label }]
 * @example
 *
 * const data = { 优秀: 5, 良好: 4, 及格: 3 }
 * convertJsonToEnum(data)
 * // => [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
 */
export const convertJsonToEnum = (data = {}) => {
  return Object.entries(data).reduce((prev, [k, v]) => {
    prev.push({
      value: k,
      label: v
    })
    return prev
  }, [])
}

/**
 * 通过 label 获取 value
 * @see getLabelByValue
 * @param  {*} label     label 值
 * @param  {Array}  [data=[{ value, label }]]      数据源
 * @param  {String} [emptyText='--'] 空值
 * @return {String}           value对应的label
 * @example
 *
 * const data = [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
 * getValueByLabel('优秀', data)
 * // => 5
 */
export const getValueByLabel = (label, data = [], emptyText = '--') => {
  let tempData = data
  if (isPlainObject(data)) {
    tempData = convertJsonToEnum(data)
  }
  const item = tempData.find(v => String(v.label) === String(label))
  if (item) {
    return item.value
  }
  return emptyText
}

/**
 * 将任意数据返回转换成 Enum [{ value, label }]
 * @param  {Object} res     数据源
 * @param  {Object} [options]={} { path = '', valueKey = 'value', labelKey = 'label', renderLabel = node => node.label }
 * @return {Array}         标准的枚举数据格式 [{ value, label }]
 * @example
 *
 * const res = { code: 1, data: { list: [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格' }] }, message: 'success' }
 * convertDataToEnum(res, { path: 'data.list', valueKey: 'code', labelKey: 'desc' })
 * // => [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
 */
export const convertDataToEnum = (res, options = {}) => {
  if (isEmptyValue(res)) {
    return []
  }
  const {
    path = '', // list 的路径
    valueKey = 'value',
    labelKey = 'label',
    renderLabel = node => node.label
  } = options
  const list = path ? get(res, path, []) : res
  return list.map(v => {
    // 数组的每一项是基本类型: number | string
    if (!isPlainObject(v)) {
      return {
        value: v,
        label: v
      }
    }
    const value = get(v, valueKey)
    const label = renderLabel({
      ...v,
      value,
      label: get(v, labelKey)
    })
    return {
      ...v,
      value,
      label
    }
  })
}

/**
 * 将任意数据返回转换成 Cascader: [{ value, label, children: [{ value, label }]}]
 * @param  {Object} res    数据源
 * @param  {Object} [options]={} { path = '', valueKey = 'value', labelKey = 'label', childrenKey = 'children', renderLabel = node => node.label }
 * @return {Array}         标准的枚举数据格式 [{ value, label }]
 * @example
 *
 * const res = { code: 1, data: { list: [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格', list: [ { code: 3.5, desc: '一般' }] }] }, message: 'success' }
 * convertDataToCascader(res, { path: 'data.list', valueKey: 'code', labelKey: 'desc', childrenKey: 'list' })
 * // => [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格', children: [{ value: 3.5, label: '一般' }] }]
 */
export const convertDataToCascader = (res, config) => {
  const {
    path = '',
    valueKey = 'value',
    labelKey = 'label',
    childrenKey = 'children',
    renderLabel = node => node.label
  } = config
  const convertData = data => {
    return data.reduce((prev, cur) => {
      const item = {
        value: cur[valueKey],
        label: cur[labelKey],
        children: []
      }
      item.label = renderLabel(item)
      if (cur[childrenKey]) {
        item.children = convertData(cur[childrenKey])
      }
      prev.push(item)
      return prev
    }, [])
  }
  const list = path ? get(res, path, []) : res
  return convertData(list)
}

/**
 * 从集合中取值
 * 比 getLabelByValue 更宽松, 容错, 默认值
 * @see getLabelByValue
 * @param  {*} value      值
 * @param  {Array}  data 数据源
 * @param  {Object} options    { key = '', valueKey = '', emptyText = '--' }
 * @return {*}            值
 * @example
 *
 * const data = [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格' }];
 * getValueInCollection('优秀', data, { key: 'code', valueKey: 'desc' })
 * // => 5
 *
 * @example
 *
 * const data = [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格' }];
 * getValueInCollection(5, data, { valueKey: 'code', key: 'desc' })
 * // => '优秀'
 */
export const getValueInCollection = (value, data = [], options = {}) => {
  const { key = '', valueKey = '', emptyText = '--' } = options
  const item = data.find(v => {
    return String(value) === String(v[key])
  })
  if (item) {
    return item[valueKey]
  }
  return emptyText
}
