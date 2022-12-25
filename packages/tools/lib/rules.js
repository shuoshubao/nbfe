import { isEmpty, isNumber, isUndefined, find, uniqWith, isEqual } from 'lodash'
import { isEmptyArray } from './types'

class ValidatorRules {
  constructor() {
    // 只能是中文
    this.chinese = {
      message: '只能输入中文',
      pattern: /^[\u4e00-\u9fa5]+$/
    }

    // 英文 + 下划线
    this.letterAndUnderline = {
      message: '只能是英文、下划线',
      pattern: /^[a-zA-Z_]+$/
    }
  }

  // 数字范围: 错误信息拼接函数
  static numberRangeMessageFunc = (description, value) => {
    return ['应', description, value].join('')
  }

  // 数字范围: 描述
  static numberRangeValidatorList = [
    {
      key: 'eq',
      description: '等于',
      validate: (a, b) => {
        return a === b
      }
    },
    {
      key: 'ne',
      description: '不等于',
      validate: (a, b) => {
        return a !== b
      }
    },
    {
      key: 'gt',
      description: '大于',
      validate: (a, b) => {
        return a > b
      }
    },
    {
      key: 'lt',
      description: '小于',
      validate: (a, b) => {
        return a < b
      }
    },
    {
      key: 'ge',
      description: '大于等于',
      validate: (a, b) => {
        return a >= b
      }
    },
    {
      key: 'le',
      description: '小于等于',
      validate: (a, b) => {
        return a <= b
      }
    },
    // 小数位数限制
    {
      key: 'decimalLength',
      description: value => {
        return ['最多', value, '位小数'].join('')
      },
      validate: (a, b) => {
        const [, decimal = ''] = String(a).split('.')
        return decimal.length <= b
      }
    }
  ]

  // 必填: 输入框
  required = (text = '') => {
    return { required: true, message: `${text}不能为空` }
  }

  // 必填: 单选下拉框
  selectRequired = (text = '') => {
    return {
      required: true,
      message: `请选择${text}`,
      transform(value) {
        if (isNumber(value)) {
          return String(value)
        }
        return value
      }
    }
  }

  // 必填: 多选下拉框
  multipleRequired = (text = '') => {
    return [
      {
        ...this.selectRequired(text),
        transform(value) {
          if (isUndefined(value)) {
            return ''
          }
          return value.join('')
        }
      },
      {
        validator: (rule, value, callback) => {
          if (isEmpty(value)) {
            return callback(new Error(`请选择${text}`))
          }
          return callback()
        }
      }
    ]
  }

  // 必填 Cascader
  cascaderRequired = (text = '') => {
    return {
      required: true,
      message: `请选择${text}`,
      transform(value) {
        if (isUndefined(value)) {
          return ''
        }
        return value.join('')
      }
    }
  }

  // min
  min = (text = '', num = 0) => {
    return {
      min: num,
      message: `${text}最少${num}个字符`
    }
  }

  // max
  max = (text = '', num = 0) => {
    return {
      max: num,
      message: `${text}最多${num}个字符`
    }
  }

  // uniq
  uniq = (text = '') => {
    return {
      validator: (rule, value) => {
        if (!isEqual(uniqWith(value, isEqual), value)) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(`${text}存在重复项`)
        }
        return Promise.resolve()
      }
    }
  }

  // 数字范围
  numberRange = (text = '', config = {}, messageFuc = ValidatorRules.numberRangeMessageFunc) => {
    return (rule, value, callback) => {
      const val = Number(value)

      const results = []

      Object.entries(config).forEach(([k, v]) => {
        const { description, validate } = find(ValidatorRules.numberRangeValidatorList, { key: k })
        if (!validate(val, v)) {
          if (k === 'decimalLength') {
            results.push(description(v))
          } else {
            results.push(messageFuc(description, v))
          }
        }
      })

      if (!isEmptyArray(results)) {
        callback(new Error(`${text}: ${results[0]}`))
      }

      callback()
    }
  }
}

/**
 * 校验规则
 * 校验库参考: [async-validator](https://www.npmjs.com/package/async-validator)
 * @type {Array.<ValidatorRules>}
 * @example
 *
 * rules.required('Form.Item label')
 * rules.selectRequired('Form.Item label')
 * rules.multipleRequired('Form.Item label')
 * rules.cascaderRequired('Form.Item label')
 * rules.min('Form.Item label', 1)
 * rules.max('Form.Item label', 5)
 * rules.numberRange('Form.Item label', {  })
 * // 数字范围的抽象描述
 * [
 *     {
 *         key: 'eq',
 *         description: '等于',
 *         validate: (a, b) => {
 *             return a === b;
 *         }
 *     },
 *     {
 *         key: 'ne',
 *         description: '不等于',
 *         validate: (a, b) => {
 *             return a !== b;
 *         }
 *     },
 *     {
 *         key: 'gt',
 *         description: '大于',
 *         validate: (a, b) => {
 *             return a > b;
 *         }
 *     },
 *     {
 *         key: 'lt',
 *         description: '小于',
 *         validate: (a, b) => {
 *             return a < b;
 *         }
 *     },
 *     {
 *         key: 'ge',
 *         description: '大于等于',
 *         validate: (a, b) => {
 *             return a >= b;
 *         }
 *     },
 *     {
 *         key: 'le',
 *         description: '小于等于',
 *         validate: (a, b) => {
 *             return a <= b;
 *         }
 *     },
 *     // 小数位数限制
 *     {
 *         key: 'decimalLength',
 *         description: value => {
 *             return ['最多', value, '位小数'].join('');
 *         },
 *         validate: (a, b) => {
 *             const [, decimal = ''] = String(a).split('.');
 *             return decimal.length <= b;
 *         }
 *     }
 * ]
 */
export const rules = new ValidatorRules()
