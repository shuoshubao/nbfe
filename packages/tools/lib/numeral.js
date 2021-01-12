// 千分位展示
export const thousands = num => {
    const data = +num || 0;
    if (!data) {
        return num;
    }
    const [int, dec] = String(num).split('.');
    const formatInt = int.replace(/(?=(?!^)(\d{3})+$)/g, ',');
    if (+dec) {
        return [formatInt, dec].join('.');
    }
    return formatInt;
};

// 取区间值
export const getValueInRange = (value, min, max) => {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};
