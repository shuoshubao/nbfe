import test from 'ava';
import { formatEmptyToDefault, convertObjectToArray, convertArrayToObject } from '../../lib/data';

test('formatEmptyToDefault', async t => {
    const { deepEqual } = t;

    deepEqual(formatEmptyToDefault(), undefined);

    const data1 = {
        a: 1,
        b: null,
        c: '',
        d: ' '
    };

    const formater1 = {
        a: '',
        b: -1,
        c: -1
    };

    formatEmptyToDefault(data1, formater1);

    deepEqual(data1, {
        a: 1,
        b: -1,
        c: -1,
        d: ' '
    });
});

test('convertObjectToArray', async t => {
    const { throws, deepEqual } = t;

    throws(() => {
        convertObjectToArray();
    });

    throws(() => {
        convertObjectToArray({ a: 1, b: 2 });
    });

    const data1 = { 1: { b: 2, c: 3 }, 2: { b: 2, c: 3 } };

    const data2 = [
        { id: '1', b: 2, c: 3 },
        { id: '2', b: 2, c: 3 }
    ];

    deepEqual(convertObjectToArray(data1, 'id'), data2);
});

test('convertArrayToObject', async t => {
    const { throws, deepEqual } = t;

    throws(() => {
        convertArrayToObject();
    });

    const data1 = [
        { a: 1, b: 2, c: 3 },
        { a: 2, b: 2, c: 3 }
    ];

    const data2 = { 1: { b: 2, c: 3 }, 2: { b: 2, c: 3 } };

    deepEqual(convertArrayToObject(data1, 'a'), data2);
});
