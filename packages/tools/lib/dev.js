import { random } from 'lodash';

export const sleep = (time = -1) => {
    const sleepTime = time < 0 ? random(2, 5) : time;
    return new Promise(resolve => setTimeout(resolve, sleepTime * 1e3));
};

export const fakeFetch = (data = {}, time = -1) => {
    return new Promise(resolve => {
        sleep(time).then(() => {
            resolve(data);
        });
    });
};
