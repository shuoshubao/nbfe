import { omit, flatten } from 'lodash';
import { isEmptyValue } from './types';

/**
 * 只保留对象的部分属性(删除之外的属性)
 * @param  {Object} [data] 数据源
 * @param  {Array}  [keys] 需要保留的属性列表
 * @return {*}      修改数据源
 * @example
 *
 * var data = { a: 1, b: 2, c: 3 }
 * reserveProperties(data, ['a'])
 * console.log(data);
 *
 * // => { a: 1 };
 *
 */
export const reserveProperties = (data = {}, keys = []) => {
    Object.keys(data)
        .filter(v => !keys.includes(v))
        .forEach(v => {
            delete data[v];
        });
};

/**
 * 批量删除属性
 * @param  {Object} [data] 数据源
 * @param  {Array}  [keys] 需要删除的属性列表
 * @return {*}      修改数据源
 * @example
 *
 * var data = { a: 1, b: 2, c: 3 };
 * removeProperties(data, ['a']);
 * console.log(data);
 * // => { b: 2, c: 3 };
 */
export const removeProperties = (data = {}, keys = []) => {
    keys.forEach(v => {
        delete data[v];
    });
};

/**
 * 批量删除属性值为空的属性
 * @param  {Object} [data] 数据源
 * @return {*}      修改数据源
 * @example
 *
 * var data = { a: '', b: 0, c: false, d: null, e: { a: 0 } };
 * removeEmptyProperties(data, ['a']);
 * console.log(data);
 * // => { b: 0, c: false, e: { a: 0 } };
 */
export const removeEmptyProperties = (data = {}) => {
    Object.entries(data).forEach(([k, v]) => {
        if (isEmptyValue(v)) {
            delete data[k];
        }
    });
};

/**
 * 产生一个值全为空的对象
 * @param  {Array}  [keys]      属性列表
 * @param  {String} [emptyText] 空值
 * @return {Object}           [值全为空的对象]
 * @example
 *
 * produceEmptyObject(['a', 'b']);
 * // => { a: '', b: '' }
 *
 * @example
 *
 * produceEmptyObject(['a', 'b'], null);
 * // => { a: null, b: null }
 */
export const produceEmptyObject = (keys = [], emptyText = '') => {
    return flatten(keys).reduce((prev, cur) => {
        prev[cur] = emptyText;
        return prev;
    }, {});
};

/**
 * 将数据中的空值替换为默认值
 * @param  {Object} data     数据源
 * @param  {Object} formater [{ key, value }]
 * @return {*}      修改数据源
 * @example
 *
 * const data = {
 *     a: 1,
 *     b: null,
 *     c: '',
 *     d: ' '
 * };
 * const formater1 = {
 *     a: '',
 *     b: -1,
 *     c: -1
 * };
 * formatEmptyToDefault(data, formater1);
 * console.log(data);
 * // => { a: 1, b: -1, c: -1, d: ' ' }
 */
export const formatEmptyToDefault = (data = {}, formater = {}) => {
    Object.entries(data).forEach(([k, v]) => {
        Object.entries(formater).forEach(([k2, v2]) => {
            if (k2 === k) {
                if (isEmptyValue(v)) {
                    data[k] = v2;
                }
            }
        });
    });
};

/**
 * 将 promise变成一个只有 resolved 态
 * @param  {Promise} promise Promise实例
 * @param  {any} [params]  需要传入的参数
 * @return {Promise<Boolean>}         Promise 执行结果
 * @example
 *
 * // nothing
 */
export const booleanPromise = (promise, params) => {
    return new Promise(resolve => {
        let tempPromise;
        if (params) {
            tempPromise = promise(params);
        } else {
            tempPromise = promise();
        }
        tempPromise
            .then(() => {
                resolve(true);
            })
            .catch(() => {
                resolve(false);
            });
    });
};
