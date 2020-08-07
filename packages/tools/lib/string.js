import { upperFirst, camelCase } from 'lodash';

// trim 所有空白
export const trimAll = (str = '') => {
    return str.replace(/\s+/g, '');
};

// 帕斯卡
export const pascalCase = (str = '') => {
    return upperFirst(camelCase(str));
};
