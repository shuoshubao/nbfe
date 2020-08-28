/**
 * 校验规则
 * @author fangtao04
 * @date   2020/04/07
 * async-validator: https://www.npmjs.com/package/async-validator
 */

import { isEmpty, isNumber, isUndefined, find } from 'lodash';
import { isEmptyArray } from './types';

class ValidatorRules {
    constructor() {
        // 只能是中文
        this.chinese = {
            message: '只能输入中文',
            pattern: /^[\u4e00-\u9fa5]+$/
        };

        // 英文 + 下划线
        this.letterAndUnderline = {
            message: '只能是英文、下划线',
            pattern: /^[a-zA-Z_]+$/
        };
    }

    // 数字范围: 错误信息拼接函数
    static numberRangeMessageFunc = (description, value) => {
        return ['应', description, value].join('');
    };

    // 数字范围: 描述
    static numberRangeValidatorList = [
        {
            key: 'eq',
            description: '等于',
            validate: (a, b) => {
                return a === b;
            }
        },
        {
            key: 'ne',
            description: '不等于',
            validate: (a, b) => {
                return a !== b;
            }
        },
        {
            key: 'gt',
            description: '大于',
            validate: (a, b) => {
                return a > b;
            }
        },
        {
            key: 'lt',
            description: '小于',
            validate: (a, b) => {
                return a < b;
            }
        },
        {
            key: 'ge',
            description: '大于等于',
            validate: (a, b) => {
                return a >= b;
            }
        },
        {
            key: 'le',
            description: '小于等于',
            validate: (a, b) => {
                return a <= b;
            }
        }
    ];

    // 必填: 输入框
    required = (text = '') => {
        return { required: true, message: `${text}不能为空`, trigger: 'blur change' };
    };

    // 必填: 单选下拉框
    selectRequired = (text = '') => {
        return {
            required: true,
            message: `请选择${text}`,
            trigger: 'blur change',
            transform(value) {
                if (isNumber(value)) {
                    return String(value);
                }
                return value;
            }
        };
    };

    // 必填: 多选下拉框
    multipleRequired = (text = '') => {
        return [
            {
                ...this.selectRequired(text),
                transform(value) {
                    if (isUndefined(value)) {
                        return '';
                    }
                    return value.join('');
                }
            },
            {
                validator: (rule, value, callback) => {
                    if (isEmpty(value)) {
                        return callback(new Error(`请选择${text}`));
                    }
                    return callback();
                },
                trigger: 'blur change'
            }
        ];
    };

    // 必填 Cascader
    cascaderRequired = (text = '') => {
        return {
            required: true,
            message: `请选择${text}`,
            trigger: 'blur change',
            transform(value) {
                if (isUndefined(value)) {
                    return '';
                }
                return value.join('');
            }
        };
    };

    // min
    min = (num = 0) => {
        return {
            min: num,
            message: `最少${num}个字符`
        };
    };

    // max
    max = (num = 0) => {
        return {
            max: num,
            message: `最多${num}个字符`
        };
    };

    // 数字范围
    numberRange = (text = '', config = {}, messageFuc = ValidatorRules.numberRangeMessageFunc) => {
        return (rule, value, callback) => {
            const val = Number(value);

            const results = [];

            Object.entries(config).forEach(([k, v]) => {
                const { description, validate } = find(ValidatorRules.numberRangeValidatorList, { key: k });
                if (!validate(val, v)) {
                    results.push(messageFuc(description, v));
                }
            });

            if (!isEmptyArray(results)) {
                callback(new Error(`${text}: ${results[0]}`));
            }

            callback();
        };
    };
}

export const rules = new ValidatorRules();
