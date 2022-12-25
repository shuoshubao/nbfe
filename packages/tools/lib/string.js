import { upperFirst, camelCase } from 'lodash'

/**
 * trim 所有空白
 * @param  {String} str 字符串
 * @return {String}     去掉所有空白的字符串
 * @example
 *
 * trimAll(' a b c ');
 * // => 'abc'
 */
export const trimAll = (str = '') => {
  return str.replace(/\s+/g, '')
}

/**
 * 帕斯卡
 * @param  {String} str 字符串
 * @return {String}     帕斯卡形式的字符串
 * @example
 *
 * pascalCase('a b c');
 * // => 'ABC'
 *
 * @example
 *
 * pascalCase('a-b-c');
 * // => 'ABC'
 *
 * @example
 *
 * pascalCase('a_b_c');
 * // => 'ABC'
 *
 * @example
 *
 * pascalCase('a,b,c');
 * // => 'ABC'
 *
 * @example
 *
 * pascalCase('aBc');
 * // => 'ABc'
 */
export const pascalCase = (str = '') => {
  return upperFirst(camelCase(str))
}
