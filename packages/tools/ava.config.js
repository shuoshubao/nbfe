export default {
  require: ['./test/helpers/setup-browser-env.js', './test/helpers/fetch.js', 'esm'],
  babel: {
    compileAsTests: ['test/**/*', '**/test/helpers/**/*']
  }
}
