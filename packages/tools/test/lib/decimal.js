import test from 'ava'
import { plus, minus, mul, div } from '../../lib/decimal'

test('plus', async t => {
  const { is } = t
  is(plus(1, 1), 2)
  is(plus(0.1, 0.2), 0.3)
})

test('minus', async t => {
  const { is } = t
  is(minus(1, 1), 0)
  is(minus(0.1, 0.2), -0.1)
})
