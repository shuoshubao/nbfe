import { isNull, isUndefined, flatten } from 'lodash';
import { isEmptyString } from './types';

export const queryParse = (queryString = '') => {
    let query;
    if (queryString.startsWith('?')) {
        query = queryString.substring(1);
    } else {
        query = queryString;
    }
    if (isEmptyString(query)) {
        return {};
    }
    return query.split('&').reduce((prev, cur) => {
        const [k, v = null] = cur.split('=');
        const val = isNull(v) ? v : decodeURIComponent(v);
        if (isUndefined(prev[k])) {
            prev[k] = val;
        } else {
            prev[k] = flatten([prev[k], val]);
        }
        return prev;
    }, {});
};

export const queryStringify = (params = {}) => {
    return Object.entries(params || {})
        .reduce((prev, cur) => {
            const [k, v] = cur;
            if (isUndefined(v)) {
                return prev;
            }
            if (isNull(v)) {
                prev.push(k);
            } else {
                const list = flatten([v])
                    .filter(v2 => {
                        return !isUndefined(v2);
                    })
                    .map(v2 => {
                        const val = encodeURIComponent(v2);
                        return isNull(v2) ? k : [k, val].join('=');
                    });
                prev.push(...list);
            }
            return prev;
        }, [])
        .join('&');
};
