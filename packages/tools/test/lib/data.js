import test from 'ava'
import { arrayMove, formatEmptyToDefault } from '../../lib/data'

test('arrayMove', async t => {
  const { deepEqual } = t

  const arr1 = [11, 22, 33, 44, 55, 66]
  const arr11 = arrayMove(arr1, 0, 1)
  deepEqual(arr1, [22, 11, 33, 44, 55, 66])
  deepEqual(arr11, [22, 11, 33, 44, 55, 66])

  const arr2 = [11, 22, 33, 44, 55, 66]
  arrayMove(arr2, 0, -1)
  deepEqual(arr2, [66, 22, 33, 44, 55, 11])
})

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
