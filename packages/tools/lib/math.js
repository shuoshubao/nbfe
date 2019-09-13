import { flatten } from 'lodash';
import { isEmptyValue } from './types';

// 空数组 []
export const isEmptyArray = arr => {
    return arr.length === 0;
};

// 空对象 {}
export const isEmptyObject = obj => {
    return isEmptyArray(Object.keys(obj));
};

// 只保留对象的部分属性(删除之外的属性)
export const reserveProperties = (data = {}, keys = []) => {
    Object.keys(data)
        .filter(v => !keys.includes(v))
        .forEach(v => {
            delete data[v];
        });
};

// 批量删除属性
export const removeProperties = (data = {}, keys = []) => {
    keys.forEach(v => {
        delete data[v];
    });
};

// 批量删除属性值为空的属性
export const removeEmptyProperties = (data = {}) => {
    Object.entries(data).forEach(([k, v]) => {
        if (isEmptyValue(v)) {
            delete data[k];
        }
    });
};

/**
 * 产生一个值全是空字符串的对象
 * input: ['a', 'b']
 * output: {
 *     a: '',
 *     b: ''
 * }
 */
export const produceEmptyObject = (keys = [], emptyText = '') => {
    return flatten(keys).reduce((prev, cur) => {
        prev[cur] = emptyText;
        return prev;
    }, {});
};
