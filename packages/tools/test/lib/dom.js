import test from 'ava';
import { convertCssom, getCssText, suffixClassNames } from '../../lib/dom';

test('convertCssom', t => {
    const { deepEqual } = t;
    deepEqual(convertCssom({ color: 'red' }), { color: 'red' });
});

test('getCssText', t => {
    const { is } = t;
    is(getCssText({}), '');
    is(getCssText({ color: 'red' }), 'color: red;');
    is(getCssText({ fontSize: 12 }), 'font-size: 12px;');
    is(getCssText({ marginTop: 12 }), 'margin-top: 12px;');
    is(getCssText({ fontSize: 12, marginTop: 12 }), 'font-size: 12px; margin-top: 12px;');
});

test('suffixClassNames', t => {
    const { is } = t;
    is(suffixClassNames('abc', { actived: false }), 'abc');
    is(suffixClassNames('abc', { actived: true }), 'abc abc-actived');
    is(suffixClassNames('abc', { actived: true, hover: false }), 'abc abc-actived');
    is(suffixClassNames('abc', { actived: true, hover: true }), 'abc abc-actived abc-hover');
    is(
        suffixClassNames('abc-de', { actived: true, hover: true }, { separator: '__' }),
        'abc-de abc-de__actived abc-de__hover'
    );
});
