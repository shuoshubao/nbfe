import { get, isPlainObject } from 'lodash';
import { isEmptyValue } from './types';

// 从集合中取值 比 getLabelByValue 更宽松
// 容错, 默认值
export const getValueInCollection = (value, collection = [], options = {}) => {
    const { key = '', valueKey = '', emptyText = '--' } = options;
    const item = collection.find(v => {
        return String(value) === String(v[key]);
    });
    if (item) {
        return item[valueKey];
    }
    return emptyText;
};

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

// 将任意数据返回转换成 Enum [{ value, label }]
export const convertDataToEnum = (res, options = {}) => {
    if (isEmptyValue(res)) {
        return [];
    }
    const {
        path = '', // list 的路径
        valueKey = 'value',
        labelKey = 'label',
        renderLabel = node => node.label
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
        const value = get(v, valueKey);
        const label = renderLabel({
            ...v,
            value,
            label: get(v, labelKey)
        });
        return {
            ...v,
            value,
            label
        };
    });
};

// 将任意数据返回转换成 Cascader: [{ value, label, children: [{ value, label }]}]
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
