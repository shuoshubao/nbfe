import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const createComment = data => {
  return [
    '/*!',
    ...data.map(v => {
      return ['*', v].join(' ')
    }),
    '*/'
  ].join('\n')
}

const getBanner = () => {
  const { name, version, author, license } = pkg
  const data = [
    `${name} v${version}`,
    `(c) 2020-${new Date().getFullYear()} ${author}`,
    `Released under the ${license} License.`
  ]
  return createComment(data)
}

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    banner: getBanner()
  },
  plugins: [
    // terser(),
    json(),
    babel({
      babelrc: false,
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    })
  ]
}
