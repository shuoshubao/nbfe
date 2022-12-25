import { uniq, isNull, isUndefined, isFunction, isObject, isArray, flatten } from 'lodash'

/**
 * 重复数组
 * @param  {Array}  [arr=[]] 数组
 * @return {Boolean}     数组是否存在重复项
 * @example
 *
 * isUniq();
 * // => true
 *
 * @example
 *
 * isUniq([1, 2, 3]);
 * // => true
 *
 * @example
 *
 * isUniq([1, 2, 3, 2]);
 * // => false
 */
export const isUniq = (arr = []) => {
  return uniq(arr).length === arr.length
}

/**
 * 空字符串
 * @param  {*} value 值
 * @return {Boolean}     是否是空字符串
 * @example
 *
 * isEmptyString('');
 * // => true
 *
 * @example
 *
 * isEmptyString(null);
 * // => false
 *
 * @example
 *
 * isEmptyString([]);
 * // => false
 */
export const isEmptyString = value => {
  return value === ''
}

/**
 * 空值: null undefined ''
 * @param  {*} value 值
 * @return {Boolean}     是否为空值
 * @example
 *
 * isEmptyValue(null);
 * // => true
 * isEmptyValue(undefined);
 * // => true
 * isEmptyValue('');
 * // => true
 * isEmptyValue([]);
 * // => false
 * isEmptyValue(false);
 * // => false
 * isEmptyValue(123);
 * // => false
 */
export const isEmptyValue = value => {
  return [isNull, isUndefined, isEmptyString].some(v => v(value))
}

/**
 * Promise
 * @param  {*} value 值
 * @return {Boolean}     是否是Promise
 * @example
 *
 * const p1 = new Promise((resolve, reject) => {
 *
 * });
 * isPromise(p1);
 * // => false
 *
 * isPromise(1);
 * // => false
 */
export const isPromise = value => {
  return isObject(value) && isFunction(value.then)
}

/**
 * Blob
 * @param  {*} value 值
 * @return {Boolean}     是否是Blob类型
 * @example
 *
 * isBlob(new Blob());
 * // => true
 *
 * @example
 *
 * isBlob(123);
 * // => false
 */
export const isBlob = value => {
  return Object.prototype.toString.call(value) === '[object Blob]'
}

/**
 * 空数组
 * @param  {*} arr 值
 * @return {Boolean}     是否是空数组
 * @example
 *
 * isEmptyArray([]);
 * // => true
 *
 * @example
 *
 * isEmptyArray([1, 2]);
 * // => false
 *
 * @example
 *
 * isEmptyArray('abc');
 * // => false
 */
export const isEmptyArray = arr => {
  return isArray(arr) && arr.length === 0
}

/**
 * 空对象
 * @param  {*} obj 值
 * @return {Boolean}     是否是空对象 {}
 * @example
 *
 * isEmptyObject({});
 * // => true
 *
 * @example
 *
 * isEmptyObject({ a: 1 });
 * // => false
 *
 * @example
 *
 * isEmptyObject(null);
 * // => false
 */
export const isEmptyObject = obj => {
  return obj && isEmptyArray(Object.keys(obj))
}

/**
 * 全真
 * @param  {...*} args 值
 * @return {Boolean}         数组每一项都是truthy
 * @example
 *
 * isEveryTruthy(1, 2, 3);
 * // true
 *
 * @example
 * isEveryTruthy([1, 2, 3]);
 * // true
 *
 * @example
 * isEveryTruthy(0, 2, 3);
 * // false
 *
 * @example
 * isEveryTruthy(1 > 0, 2 != 1, 3);
 * // true
 */
export const isEveryTruthy = (...args) => {
  return flatten(args).every(Boolean)
}

/**
 * 全假
 * @param  {...*} args 值
 * @return {Boolean}         数组每一项都是falsy
 * @example
 *
 * isEveryFalsy(false, '', 0);
 * // => true
 *
 * @example
 *
 * isEveryFalsy([false, '', 0]);
 * // => true
 *
 * @example
 *
 * isEveryFalsy(false, '', 2 > 1);
 * // => false
 */
export const isEveryFalsy = (...args) => {
  return flatten(args).every(v => !v)
}

/**
 * 部分真
 * @param  {...*} args 值
 * @return {Boolean}         部分真
 * @example
 *
 * isSomeTruthy(1, 2, 3);
 * // => true
 *
 * @example
 *
 * isSomeTruthy([1, 2]);
 * // => true
 *
 * @example
 *
 * isSomeTruthy(0, null);
 * // => false
 *
 * @example
 *
 * isSomeTruthy([]);
 * // => false
 *
 * @example
 *
 * isSomeTruthy([0, false]);
 * // => false
 */
export const isSomeTruthy = (...args) => {
  return flatten(args).some(Boolean)
}

/**
 * 部分假
 * @param  {...*} args 值
 * @return {Boolean}         部分假
 * @example
 *
 * isSomeFalsy(0, 1, 2);
 * // => true
 *
 * @example
 *
 * isSomeFalsy([0, null]);
 * // => true
 *
 * @example
 *
 * isSomeFalsy(1, 2, true, 'false');
 * // => false
 */
export const isSomeFalsy = (...args) => {
  return flatten(args).some(v => !v)
}
