import test from 'ava'
import { isUniq, isEmptyString, isEmptyValue } from '../../lib/types'

test('isUniq', async t => {
  t.true(isUniq())
  t.true(isUniq([1, '1']))
  t.false(isUniq([1, 1]))
})

test('isEmptyString', async t => {
  const { truthy, falsy } = t
  truthy(isEmptyString(''))
  falsy(isEmptyString(null))
  falsy(isEmptyString(undefined))
  falsy(isEmptyString(' '))
  falsy(isEmptyString('1'))
})

test('isEmptyValue', async t => {
  const { truthy, falsy } = t
  truthy(isEmptyValue(''))
  truthy(isEmptyValue(null))
  truthy(isEmptyValue(undefined))
  falsy(isEmptyValue(' '))
  falsy(isEmptyValue('1'))
})
