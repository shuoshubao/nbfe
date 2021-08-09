import { omit, flatten } from 'lodash';
import { isEmptyValue } from './types';

/**
 * 只保留对象的部分属性(删除之外的属性)
 * @param  {Object} [data] 数据源
 * @param  {Array}  [keys] 需要保留的属性列表
 * @return {*}      修改数据源
 * @example
 *
 * var data = { a: 1, b: 2, c: 3 };
 * reserveProperties(data, ['a']);
 *
 * => data = { a: 1 };
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
 * reserveProperties(data, ['a']);
 *
 * => data = { b: 2, c: 3 };
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
 * const data1 = {
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
 * formatEmptyToDefault(data1, formater1);
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
 * 将 element-ui Form组件 的 validate 变成一个始终是resolved状态的promise, 不用写try-catch或者回调函数的形式
 * @param  {Function} [.validate] 校验方法
 * @return {Promise<Boolean>} 校验结果
 */
export const pifyValidate = validateFn => {
    return new Promise(resolve => {
        validateFn(valid => {
            resolve(valid);
        });
    });
};

/**
 * 将 promise变成一个只有 resolved 态
 * @param  {Promise} promise Promise实例
 * @param  {any} params  需要传入的参数
 * @return {Promise<Boolean>}         Promise 执行结果
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
