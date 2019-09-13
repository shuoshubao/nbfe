import { uniq, omit } from 'lodash';

// 重复数组
export const isUniq = (arr = []) => {
    return uniq(arr).length === arr.length;
};

// 将数据中的空值('', undefined, null)替换为默认值
export const formatEmptyToDefault = (data = {}, formater = {}) => {
    Object.entries(data).forEach(([k, v]) => {
        Object.entries(formater).forEach(([k2, v2]) => {
            if (k2 === k) {
                if (v === '' || v == null) {
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
