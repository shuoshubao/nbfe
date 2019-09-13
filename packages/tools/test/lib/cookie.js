import test from 'ava';
import { getCookie } from '../../lib/cookie';

test('getCookie', async t => {
    const { is } = t;
    is(getCookie('name'), undefined);
});
