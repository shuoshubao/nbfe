import { flatten } from 'lodash'

const getDecLength = num => {
  const [, dec = ''] = String(num).split('.')
  return dec.length
}

const removeDot = num => {
  return +String(num).replace('.', '')
}

const mulTwo = (a, b) => {
  const decAll = getDecLength(a) + getDecLength(b)
  return (removeDot(a) * removeDot(b)) / 10 ** decAll
}

const plusTwo = (a, b) => {
  const decMax = Math.max(getDecLength(a), getDecLength(b))
  const temp = 10 ** decMax
  return (mulTwo(a, temp) + mulTwo(b, temp)) / temp
}

/**
 * 浮点数计算-加法
 * @alias add
 * @param  {...Number} [args] 加数
 * @return {Number} 运算之和
 * @example
 *
 * plus(0.1, 0.2)
 * // => 0.3
 *
 * @example
 *
 * plus(0.1, 0.1, 0.1)
 * // => 0.3
 *
 * @example
 *
 * plus([0.1, 0.1, 0.1])
 * // => 0.3
 */
export const plus = (...args) => {
  return flatten(args).reduce((prev, cur) => {
    return plusTwo(prev, cur)
  }, 0)
}

/**
 * 浮点数计算-减法
 * @alias sub
 * @param  {Number} a 减数
 * @param  {Number} b 被减数
 * @return {Number} 运算之差
 * @example
 *
 * minus(0.3, 0.1)
 * // => 0.2
 */
export const minus = (a, b) => {
  return plus(a, mulTwo(b, -1))
}

/**
 * 浮点数计算-乘法
 * @alias times
 * @param  {...Number} [args] 乘数
 * @return {Number} 运算之积
 * @example
 *
 * mul(0.1, 0.2)
 * // => 0.02
 *
 * @example
 *
 * mul(0.1, 0.1, 0.1)
 * // => 0.001
 *
 * @example
 *
 * mul([0.1, 0.1, 0.1])
 * // => 0.001
 */
export const mul = (...args) => {
  return flatten(args).reduce((prev, cur) => {
    return mulTwo(prev, cur)
  }, 1)
}

/**
 * 浮点数计算-除法
 * @alias dividedBy
 * @param  {Number} a 除数
 * @param  {Number} b 被除数
 * @return {Number} 运算之差
 * @example
 *
 * div(0.3, 0.1)
 * // => 3
 */
export const div = (a, b) => {
  const decMax = Math.max(getDecLength(a), getDecLength(b))
  const temp = 10 ** decMax
  return mulTwo(a, temp) / mulTwo(b, temp)
}

export { plus as add }
export { minus as sub }
export { mul as times }
export { div as dividedBy }
