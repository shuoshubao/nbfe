/**
 * 校验规则
 * @author fangtao04
 * @date   2020/04/07
 * async-validator: https://www.npmjs.com/package/async-validator
 */

import { isEmpty, isNumber, isUndefined } from 'lodash';

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

    // 必填: 输入框
    required = (text = '') => {
        return { required: true, message: `${text}不能为空`, trigger: 'blur change' };
    };

    // 必填: 单选下拉框
    selectRequired = (text = '') => {
        return {
            required: true,
            message: `请选择${text}`,
            trigger: 'change',
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
                trigger: 'change'
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
}

export const rules = new ValidatorRules();
