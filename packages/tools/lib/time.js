import { isArray } from 'lodash';
import { convertArrayToObject } from './data';

// 日期格式化
export const WeekTextMap = ['天', '一', '二', '三', '四', '五', '六'];

// YYYY-MM-DD
// YYYY-MM-DD HH:mm
// YYYY-MM-DD HH:mm:ss
export const formatTime = (date, format = 'yyyy-MM-dd', invalidText = '--') => {
    if (+date <= 0) {
        return invalidText;
    }
    const dt = new Date(+date);
    const parse = {
        yyyy: dt.getFullYear(),
        MM: dt.getMonth() + 1,
        dd: dt.getDate(),
        HH: dt.getHours(),
        mm: dt.getMinutes(),
        ss: dt.getSeconds(),
        星期: `星期${WeekTextMap[dt.getDay()]}`
    };

    parse.YYYY = parse.yyyy;
    parse.DD = parse.dd;

    Object.entries(parse).forEach(([k, v]) => {
        parse[k] = String(v).padStart(2, 0);
    });

    return Object.entries(parse).reduce((prev, [k, v]) => {
        return prev.replace(k, v);
    }, format);
};

/**
 * 处理日期范围
 *
 * {
 *     dateRangeTime: {
 *         startKey: 'sTime',
 *         endKey: 'eTime',
 *         empty: -1
 *     }
 * }
 *
 * 或
 *
 * [
 *     {
 *         prop: 'dateRangeTime',
 *         startKey: 'sTime',
 *         endKey: 'eTime',
 *         empty: -1
 *     }
 * ]
 */
export const formateDateRangeTime = (data = {}, formatter = {}) => {
    let innerFormatter = formatter;
    if (isArray(formatter)) {
        innerFormatter = convertArrayToObject(formatter, 'prop');
    }
    Object.entries(innerFormatter).forEach(([k, v]) => {
        const { startKey = '', endKey = '', empty = -1 } = v;
        let [startTime, endTime] = (data[k] || ['', '']).map(v2 => +new Date(v2) || 0);
        // 如果俩时间不为空且相等, 则加一天减一秒
        if (startTime && startTime === endTime) {
            endTime = startTime + (24 * 60 * 60 - 1) * 1000;
        }
        Object.assign(data, {
            [startKey]: startTime || empty,
            [endKey]: endTime || empty
        });
        delete data[k];
    });
};
