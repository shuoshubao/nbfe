import { isNull, isUndefined, isFunction, isObject } from 'lodash';

export const isNullOrUndefined = arg => {
    return [isNull, isUndefined].some(v => v(arg));
};

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
