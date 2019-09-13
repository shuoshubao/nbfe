import { random } from 'lodash';

export const sleep = (time = 0) => {
    const sleepTime = time || random(2, 5);
    return new Promise(resolve => setTimeout(resolve, sleepTime * 1e3));
};
