import test from 'ava'
import { formatEmptyToDefault } from '../../lib/data'

test('formatEmptyToDefault', async t => {
  const { deepEqual } = t

  deepEqual(formatEmptyToDefault(), undefined)

  const data1 = {
    a: 1,
    b: null,
    c: '',
    d: ' '
  }

  const formater1 = {
    a: '',
    b: -1,
    c: -1
  }

  formatEmptyToDefault(data1, formater1)

  deepEqual(data1, {
    a: 1,
    b: -1,
    c: -1,
    d: ' '
  })
})
