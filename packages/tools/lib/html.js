import { formatters } from './formatters';

// 百分比html
// 正: 绿; 负: 红
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
