import { uniq, isNull, isUndefined, isFunction, isObject, isArray } from 'lodash';

// 是否重复数组
export const isUniq = (arr = []) => {
    return uniq(arr).length === arr.length;
};

export const isNullOrUndefined = arg => {
    return [isNull, isUndefined].some(v => v(arg));
};

export { isNullOrUndefined as isNil };

export const isEmptyString = arg => {
    return arg === '';
};

export const isEmptyValue = arg => {
    return [isNull, isUndefined, isEmptyString].some(v => v(arg));
};

export const isPromise = arg => {
    return isObject(arg) && isFunction(arg.then);
};

export const isBlob = arg => {
    return Object.prototype.toString.call(arg) === '[object Blob]';
};

// 空数组 []
export const isEmptyArray = arr => {
    return isArray(arr) && arr.length === 0;
};

// 空对象 {}
export const isEmptyObject = obj => {
    return isEmptyArray(Object.keys(obj));
};
