import { flatten } from 'lodash';

const getDecLength = num => {
    const [, dec = ''] = String(num).split('.');
    return dec.length;
};

const removeDot = num => {
    return +String(num).replace('.', '');
};

const mulTwo = (a, b) => {
    const decAll = getDecLength(a) + getDecLength(b);
    return (removeDot(a) * removeDot(b)) / 10 ** decAll;
};

const plusTwo = (a, b) => {
    const decMax = Math.max(getDecLength(a), getDecLength(b));
    const temp = 10 ** decMax;
    return (mulTwo(a, temp) + mulTwo(b, temp)) / temp;
};

export const plus = (...args) => {
    return flatten(args).reduce((prev, cur) => {
        return plusTwo(prev, cur);
    }, 0);
};

export const minus = (a, b) => {
    return plus(a, mulTwo(b, -1));
};

export const mul = (...args) => {
    return flatten(args).reduce((prev, cur) => {
        return mulTwo(prev, cur);
    }, 1);
};

export const div = (a, b) => {
    const decMax = Math.max(getDecLength(a), getDecLength(b));
    const temp = 10 ** decMax;
    return mulTwo(a, temp) / mulTwo(b, temp);
};

export { plus as add };
export { minus as sub };
export { mul as times };
export { div as dividedBy };
