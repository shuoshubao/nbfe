export default {
    require: ['./test/helpers/setup-browser-env.js', './test/helpers/fetch.js', 'esm'],
    files: ['test/**/*'],
    helpers: ['**/test/helpers/**/*']
};
