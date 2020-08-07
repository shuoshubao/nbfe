import { random } from 'lodash';

export const sleep = (time = -1) => {
    const sleepTime = time < 0 ? random(2, 5) : time;
    return new Promise(resolve => setTimeout(resolve, sleepTime * 1e3));
};

export const fakeFetch = async (data = {}, time = -1) => {
    await sleep(time);
    return Promise.resolve(data);
};
