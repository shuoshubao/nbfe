import { omit, flatten } from 'lodash';
import { isEmptyValue } from './types';

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

// 将数据中的空值('', undefined, null)替换为默认值
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

// 将对象转换为数组
export const convertObjectToArray = (data = {}, propKey = '') => {
    if (!propKey) {
        throw new Error('Missing required arguments: "propKey"');
    }
    return Object.entries(data).reduce((prev, cur) => {
        const [k, v] = cur;
        prev.push({
            ...v,
            [propKey]: k
        });
        return prev;
    }, []);
};

// 将数组转换为对象
export const convertArrayToObject = (data = [], propKey = '') => {
    if (!propKey) {
        throw new Error('Missing required arguments: "propKey"');
    }
    return data.reduce((prev, cur) => {
        prev[cur[propKey]] = omit(cur, [propKey]);
        return prev;
    }, {});
};

// 将 element-ui 或 mtd 的 validate 变成一个始终是resolved状态的promise, 不用写try-catch或者回调函数的形式
export const pifyValidate = validateFn => {
    return new Promise(resolve => {
        validateFn(valid => {
            resolve(valid);
        });
    });
};

// 将 promise变成一个只有 resolved 态
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
