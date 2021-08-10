import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import pkg from './package.json';

const createComment = data => {
    return [
        '/*!',
        ...data.map(v => {
            return ['*', v].join(' ');
        }),
        '*/'
    ].join('\n');
};

const getBanner = () => {
    const { name, version, author, license } = pkg;
    const data = [
        `${name} v${version}`,
        `(c) 2019-${new Date().getFullYear()} ${author}`,
        `Released under the ${license} License.`
    ];
    return createComment(data);
};

const plugins = [
    json(),
    babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    })
];

export default [
    {
        input: 'lib/index.js',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            banner: getBanner()
        },
        plugins
    },
    {
        input: 'lib/index.js',
        output: {
            name: 'tools',
            file: 'dist/index.umd.js',
            format: 'umd',
            banner: getBanner()
        },
        plugins
    }
];
