import test from 'ava';
import moment from 'moment';
import { formatTime } from '../../lib/time';

test('formatTime', async t => {
    const { is } = t;
    is(formatTime(Date.now(), 'yyyy'), moment().format('YYYY'));
    is(formatTime(Date.now(), 'YYYY'), moment().format('YYYY'));
    is(formatTime(Date.now(), 'a'), moment().format('a'));
    is(formatTime(Date.now(), 'A'), moment().format('A'));
    is(formatTime(Date.now(), 'Aa'), moment().format('Aa'));
    // is(formatTime(Date.now(), 'YYYY-MM-DD hh:mm:ss a'), moment().format('YYYY-MM-DD hh:mm:ss a'));
});
