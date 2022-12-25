import babel from '@rollup/plugin-babel'

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    })
  ]
}
