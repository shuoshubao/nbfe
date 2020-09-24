import { kebabCase, isNumber, isObject, flattenDeep, uniq } from 'lodash';
import { stringifyUrl } from './route';
import { isEmptyObject } from './types';

// 给元素批量设置属性
export const setAttrs = (ele, attrs = {}) => {
    Object.entries(attrs).forEach(([k, v]) => {
        ele.setAttribute(k, v);
    });
};

// 下载 blob
export const downloadBlob = (blob, options = {}) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = e => {
        const elmentA = document.createElement('a');
        const href = e.target.result;
        setAttrs(elmentA, { ...options, href });
        document.body.appendChild(elmentA);
        elmentA.click();
        document.body.removeChild(elmentA);
    };
};

// 下载文件
export const download = (url = '', params = {}) => {
    const elmentA = document.createElement('a');
    const href = stringifyUrl(url, params);
    setAttrs(elmentA, { href, download: href, target: '_blank' });
    elmentA.click();
};

// 当值为数字时, 加上单位 `px` 的css属性
const DefaultUnitsPxProperties = ['font-size', 'margin', 'padding', 'border'];

// margin, padding, border
['top', 'right', 'bottom', 'left'].forEach(v => {
    DefaultUnitsPxProperties.push(v);
    DefaultUnitsPxProperties.push(['margin', v].join('-'));
    DefaultUnitsPxProperties.push(['margin', v].join('-'));
    DefaultUnitsPxProperties.push(['border', v, 'width'].join('-'));
});

// max min
['width', 'height'].forEach(v => {
    DefaultUnitsPxProperties.push(v);
    DefaultUnitsPxProperties.push(['max', v].join('-'), ['min', v].join('-'));
});

// 给cssom加上单位px
export const convertCssom = (cssom = {}) => {
    return Object.entries(cssom).reduce((prev, [k, v]) => {
        const key = kebabCase(k);
        // 对于一些特定属性, 当值为数字时, 加上单位 px
        if (isNumber(v) && DefaultUnitsPxProperties.includes(key)) {
            prev[key] = `${v}px`;
        } else {
            prev[key] = v;
        }
        return prev;
    }, {});
};

// 给元素批量设置样式
export const setStyle = (ele, cssom) => {
    const computedCssom = convertCssom(cssom);
    Object.entries(computedCssom).forEach(([k, v]) => {
        ele.style[k] = v;
    });
};

// 获取 cssText
export const getCssText = (cssom = {}) => {
    if (isEmptyObject(cssom)) {
        return '';
    }
    const computedCssom = convertCssom(cssom);
    const cssText = Object.entries(computedCssom)
        .reduce((prev, [k, v]) => {
            prev.push([k, v].join(': '));
            return prev;
        }, [])
        .join('; ');
    return [cssText, ';'].join('');
};

// 获取字符串在浏览器中所占的长度
export const getWordWidth = (word = '', cssom = {}) => {
    const eleSpan = document.createElement('span');
    const defaultCssom = { visibility: 'hidden', whiteSpace: 'nowrap', fontSize: 14 };
    eleSpan.style.cssText = getCssText({
        ...defaultCssom,
        ...cssom
    });
    document.body.appendChild(eleSpan);
    eleSpan.innerText = word;
    const width = eleSpan.offsetWidth;
    document.body.removeChild(eleSpan);
    return Math.ceil(Number.parseFloat(width));
};

// 复制文本
export const copyText = (text = '') => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
};

// 轮子王: https://www.npmjs.com/package/classnames
export const classNames = (...args) => {
    const classNameList = [];
    flattenDeep([args]).forEach(v => {
        if (isObject(v)) {
            Object.entries(v).forEach(([k2, v2]) => {
                if (v2) {
                    classNameList.push(k2);
                }
            });
        } else {
            classNameList.push(String(v || '').trim());
        }
    });
    return uniq(classNameList.filter(Boolean)).join(' ');
};

// 给 className 加后缀
export const suffixClassNames = (baseClassName = '', suffixConfig = {}, config = {}) => {
    const computedConfig = {
        separator: '-',
        ...config
    };
    const classNameList = [baseClassName];
    Object.entries(suffixConfig).forEach(([k, v]) => {
        if (v) {
            classNameList.push([baseClassName, k].join(computedConfig.separator));
        }
    });
    return classNames(classNameList);
};
