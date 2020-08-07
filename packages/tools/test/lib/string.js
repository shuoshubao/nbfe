import test from 'ava';
import { trimAll, pascalCase } from '../../lib/string';

test('trimAll', t => {
    const { is } = t;
    is(trimAll('abc'), 'abc');
    is(trimAll('abc'), 'abc');
    is(trimAll(' abc'), 'abc');
    is(trimAll(' a bc'), 'abc');
    is(trimAll(' a b c'), 'abc');
    is(trimAll(' a b c '), 'abc');
    is(trimAll('  '), '');
});

test('pascalCase', t => {
    const { is } = t;
    is(pascalCase('foo bar'), 'FooBar');
    is(pascalCase('Foo Bar'), 'FooBar');
    is(pascalCase('fooBar'), 'FooBar');
    is(pascalCase('FooBar'), 'FooBar');
    is(pascalCase('--foo-bar--'), 'FooBar');
    is(pascalCase('__FOO_BAR__'), 'FooBar');
    is(pascalCase('!--foo-¿?-bar--121-**%'), 'FooBar121');
});
