import { get, isPlainObject } from 'lodash';
import { isEmptyValue } from './types';
import { isEmptyObject } from './math';

// 通过 value 获取 label
export const getLabelByValue = (value, data = [], emptyText = '--') => {
    const item = data.find(v => String(v.value) === String(value));
    if (item) {
        return item.label;
    }
    return emptyText;
};

// 将 json 转换成 [{ value, label }]
export const convertJsonToEnum = (data = {}) => {
    return Object.entries(data).reduce((prev, [k, v]) => {
        prev.push({
            value: k,
            label: v
        });
        return prev;
    }, []);
};

// 通过 label 获取 value
export const getValueByLabel = (label, data = [], emptyText = '--') => {
    let tempData = data;
    if (isPlainObject(data)) {
        tempData = convertJsonToEnum(data);
    }
    const item = tempData.find(v => String(v.label) === String(label));
    if (item) {
        return item.value;
    }
    return emptyText;
};

// 将接口返回转换成 Enum [{ value, label }]
export const convertDataToEnum = (res, options = {}) => {
    if (isEmptyValue(res)) {
        return [];
    }
    const {
        path = '', // list 的路径
        valueKey = 'value',
        labelKey = 'label'
    } = options;
    const list = path ? get(res, path, []) : res;
    return list.map(v => {
        // 数组的每一项是基本类型: number | string
        if (!isPlainObject(v)) {
            return {
                value: v,
                label: v
            };
        }
        return {
            ...v,
            value: get(v, valueKey),
            label: get(v, labelKey)
        };
    });
};

// 将接口返回转换成 Cascader: [{ value, label, children: [{ value, label }]}]
export const convertDataToCascader = (res, config) => {
    const {
        path = '',
        valueKey = 'value',
        labelKey = 'label',
        childrenKey = 'children',
        renderLabel = node => node.label
    } = config;
    const convertData = data => {
        return data.reduce((prev, cur) => {
            const item = {
                value: cur[valueKey],
                label: cur[labelKey],
                children: []
            };
            item.label = renderLabel(item);
            if (cur[childrenKey]) {
                item.children = convertData(cur[childrenKey]);
            }
            prev.push(item);
            return prev;
        }, []);
    };
    const list = path ? get(res, path, []) : res;
    return convertData(list);
};

// 针对后端接口不规范的二级级联
// 第一层的字段名和第二层的字段名不一致
export const convertDataToCascaderDeepTwo = (res, config) => {
    const {
        path = '',
        value1Key = 'value',
        label1Key = 'label',
        childrenKey = 'children',
        value2Key = 'value',
        label2Key = 'label',
        renderLabel = node => node.label
    } = config;
    const list = path ? get(res, path, []) : res;
    return list.map(v => {
        return {
            value: v[value1Key],
            label: v[label1Key],
            children: (v[childrenKey] || []).map(v2 => {
                return {
                    value: v2[value2Key],
                    label: v2[label2Key],
                    children: []
                };
            })
        };
    });
};
