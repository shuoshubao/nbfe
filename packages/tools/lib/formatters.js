import { isNumber } from 'lodash';
import { thousands } from './numeral';
import { mul } from './decimal';

class Formatters {
    // 不作处理
    text(value) {
        return value;
    }

    // 百分比
    percentage(value) {
        if (isNumber(value)) {
            const temp = Number(mul(value, 1e2).toFixed(2));
            return `${temp}%`;
        }
        return value;
    }

    // 数字千分位
    number(value) {
        return thousands(value);
    }
}

export const formatters = new Formatters();
