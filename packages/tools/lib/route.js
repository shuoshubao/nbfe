import { pick } from 'lodash';
import { isNullOrUndefined, isEmptyObject } from './types';
import { queryParse, queryStringify } from './qs';

export const getParams = (str, key) => {
    const params = queryParse(str);
    if (key === '') {
        return params;
    }
    return params[key];
};

// 获取 search 参数
export const search = (key = '') => {
    // 从hash里解析 search 参数 (router 模式)
    const [, str = ''] = (window.location.search || window.location.hash).split('?');
    return getParams(str, key);
};

// 拼接url
export const stringifyUrl = (url = '', params = {}) => {
    const args = Object.entries(params).reduce((prev, [k, v]) => {
        if (!isNullOrUndefined(v) && v !== '') {
            prev[k] = v;
        }
        return prev;
    }, {});
    if (isEmptyObject(args)) {
        return url;
    }
    return [url, queryStringify(args)].join('?');
};

// 跳转页面
export const linkTo = (url = '', params = {}, options = {}) => {
    const defaultOptions = {
        target: '_self', // a 标签属性
        isNewTab: false, // 是否在新 Tab打开（窗口、tab页）
        rel: 'noreferrer', // a 标签属性
        download: '' // a 标签属性
    };
    const computedOptions = {
        ...defaultOptions,
        ...options
    };
    if (computedOptions.isNewTab) {
        computedOptions.target = '_blank';
    }
    const { target, rel, download } = computedOptions;
    const href = stringifyUrl(url, params);
    const elmentA = document.createElement('a');
    elmentA.target = target;
    elmentA.href = href;
    if (rel) {
        elmentA.rel = rel;
    }
    if (download) {
        if (download === true) {
            elmentA.setAttribute('download', '');
        } else {
            elmentA.setAttribute('download', download);
        }
    }
    elmentA.setAttribute('hidden', 'hidden');
    document.body.appendChild(elmentA);
    elmentA.click();
    document.body.removeChild(elmentA);
};

// 解析 url
export const parseUrl = (url = '') => {
    const elmentA = document.createElement('a');
    elmentA.href = url;
    return pick(elmentA, ['protocol', 'host', 'pathname', 'port', 'search', 'hash']);
};

// 获取完整 url
export const getFullUrl = (url = '') => {
    if (!url) {
        return '';
    }
    const a = document.createElement('a');
    a.href = url;
    return a.href;
};
