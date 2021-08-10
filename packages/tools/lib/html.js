import { formatters } from './formatters';

/**
 * 百分比html
 * 正: 绿; 负: 红
 * @param  {Number} value  值
 * @param  {Object} config { emptyText = '--', // 空文本 reverse = false, // 颜色切换 disabled = false // 不使用颜色 }
 * @return {String}        html 字符串
 * @example
 *
 * getPercentageHtml(0.23)
 * // => '<span style="color: #00b365;">23%</span>'
 *
 * @example
 *
 * getPercentageHtml(-0.23)
 * // => '<span style="color: #00b365;">-23%</span>'
 *
 * @example
 *
 * getPercentageHtml(0.23, { disabled: true })
 * // => '23%'
 */
export const getPercentageHtml = (value, config = {}) => {
    const {
        emptyText = '--', // 空文本
        reverse = false, // 颜色切换
        disabled = false // 不使用颜色
    } = config;
    const tempValue = formatters.percentage(value);
    const greenColor = '#00b365';
    const redColor = '#f5483b';
    if (value > 0) {
        if (disabled) {
            return tempValue;
        }
        return `<span style="color: ${reverse ? redColor : greenColor};">${tempValue}</span>`;
    }
    if (value < 0) {
        if (disabled) {
            return tempValue;
        }
        return `<span style="color: ${reverse ? greenColor : redColor};">${tempValue}</span>`;
    }
    if (value === 0) {
        return tempValue;
    }
    return String(emptyText);
};
