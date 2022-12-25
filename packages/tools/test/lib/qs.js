import test from 'ava'
import { queryParse, queryStringify } from '../../lib/qs'

test('queryParse', async t => {
  const { deepEqual } = t
  deepEqual(queryParse(), {})
  deepEqual(queryParse(''), {})
  deepEqual(queryParse('?'), {})
  deepEqual(queryParse('?a'), { a: null })
  deepEqual(queryParse('?a=1'), { a: '1' })
  deepEqual(queryParse('a=1'), { a: '1' })
  deepEqual(queryParse('a=true'), { a: 'true' })
  deepEqual(queryParse('a=1&b'), { a: '1', b: null })
  deepEqual(queryParse('a=1&b=2'), { a: '1', b: '2' })
  deepEqual(queryParse('a=1&b&c'), { a: '1', b: null, c: null })
  deepEqual(queryParse('a=1&b=2&c&d=2&d=3'), { a: '1', b: '2', c: null, d: ['2', '3'] })
  deepEqual(queryParse('a=1&b=2&c&d=2&d=3&d'), { a: '1', b: '2', c: null, d: ['2', '3', null] })
})

test('queryStringify', async t => {
  const { is } = t
  is(queryStringify(), '')
  is(queryStringify(null), '')
  is(queryStringify({}), '')
  is(queryStringify({ a: 1 }), 'a=1')
  is(queryStringify({ a: '1' }), 'a=1')
  is(queryStringify({ a: 1, b: 2 }), 'a=1&b=2')
  is(queryStringify({ a: 1, b: null }), 'a=1&b')
  is(queryStringify({ a: 1, b: null, c: null }), 'a=1&b&c')
  is(queryStringify({ a: 1, b: undefined, c: null }), 'a=1&c')
  is(queryStringify({ a: true }), 'a=true')
  is(queryStringify({ a: true, b: false }), 'a=true&b=false')
  is(queryStringify({ a: 1, b: 2, c: null, d: [2, 3] }), 'a=1&b=2&c&d=2&d=3')
  is(queryStringify({ a: 1, b: 2, c: null, d: [2, undefined, 3, null] }), 'a=1&b=2&c&d=2&d=3&d')
})
