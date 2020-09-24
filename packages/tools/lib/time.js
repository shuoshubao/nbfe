// 日期格式化
const WeekTextMap = ['日', '一', '二', '三', '四', '五', '六'];

// YYYY-MM-DD
// YYYY-MM-DD HH:mm
// YYYY-MM-DD HH:mm:ss
export const formatTime = (date, format = 'YYYY-MM-DD', invalidText = '--') => {
    if (+date <= 0) {
        return invalidText;
    }
    const dt = new Date(+date || +new Date(date));
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    const hour = dt.getHours();
    const minute = dt.getMinutes();
    const second = dt.getSeconds();
    const week = `星期${WeekTextMap[dt.getDay()]}`;
    const parse = {
        YYYY: year,
        MM: month,
        DD: day,
        HH: hour,
        mm: minute,
        ss: second,
        w: week
    };

    parse.yyyy = parse.YYYY;
    parse.dd = parse.DD;
    parse.hh = parse.HH;

    // 补零
    Object.entries(parse).forEach(([k, v]) => {
        parse[k] = String(v).padStart(2, 0);
    });

    // 上午|下午
    parse.a = hour / 12 >= 1 ? 'pm' : 'am';
    parse.A = parse.a.toUpperCase();

    return Object.entries(parse).reduce((prev, [k, v]) => {
        return prev.replace(k, v);
    }, format);
};
