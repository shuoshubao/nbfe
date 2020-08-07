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
