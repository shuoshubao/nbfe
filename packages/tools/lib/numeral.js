/**
 * 千分位展示
 * @param  {Number} num 数值
 * @return {String}     千分位字符串
 * @example
 *
 * thousands(123);
 * // => '123'
 *
 * @example
 *
 * thousands(1234);
 * // => '1,234'
 *
 * @example
 *
 * thousands(1234567);
 * // => '1,234,567'
 */
export const thousands = num => {
  const data = +num || 0
  if (!data) {
    return num
  }
  const [int, dec] = String(num).split('.')
  const formatInt = int.replace(/(?=(?!^)(\d{3})+$)/g, ',')
  if (+dec) {
    return [formatInt, dec].join('.')
  }
  return formatInt
}

/**
 * 取区间值
 * @param  {Number} value 数值
 * @param  {Number} min   最小值
 * @param  {Number} max   最大值
 * @return {Number}       区间值
 * @example
 *
 * getValueInRange(1, 2, 7);
 * // => 2
 * @example
 *
 * getValueInRange(3, 2, 7);
 * // => 3
 *
 * @example
 *
 * getValueInRange(12, 2, 7);
 * // => 7
 */
export const getValueInRange = (value, min, max) => {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}
