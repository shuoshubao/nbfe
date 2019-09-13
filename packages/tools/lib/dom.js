import { kebabCase, isNumber } from 'lodash';
import { stringifyUrl } from './route';

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
    setAttrs(elmentA, { href, download: href });
    // https 页面下载 http协议在新窗口打开
    if (window.location.protocol === 'https:' && href.startsWith('http://')) {
        elmentA.target = '_blank';
    }
    elmentA.click();
};

// 当值为数字时, 加上单位 `px` 的css属性
const DefaultUnitsPxProperties = ['width', 'height', 'font-size', 'margin', 'padding', 'border'];

// margin, padding, border
['top', 'right', 'bottom', 'left'].forEach(v => {
    DefaultUnitsPxProperties.push(['margin', v].join('-'));
    DefaultUnitsPxProperties.push(['margin', v].join('-'));
    DefaultUnitsPxProperties.push(['border', v, 'width'].join('-'));
});

// max min
['width', 'height'].forEach(v => {
    DefaultUnitsPxProperties.push(['max', v].join('-'), ['min', v].join('-'));
});

// 给cssom加上单位px
export const convertCssom = (cssom = {}) => {
    return Object.entries(cssom).reduce((prev, [k, v]) => {
        // 对于一些特定属性, 当值为数字时, 加上单位 px
        if (isNumber(v) && DefaultUnitsPxProperties.includes(kebabCase(k))) {
            prev[k] = `${v}px`;
        } else {
            prev[k] = v;
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
    const eleDiv = document.createElement('div');
    setStyle(eleDiv, cssom);
    return eleDiv.style.cssText;
};

// 获取单词的长度
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
