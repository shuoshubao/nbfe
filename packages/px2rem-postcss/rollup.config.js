import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
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
        `(c) 2020-${new Date().getFullYear()} ${author}`,
        `Released under the ${license} License.`
    ];
    return createComment(data);
};

// 获取单个文件的 rollup 配置
const getSingleRollupConfig = (input = '', outputFile = '') => {
    return {
        input,
        output: {
            file: outputFile,
            format: 'cjs',
            banner: getBanner()
        },
        plugins: [
            terser(),
            json(),
            babel({
                babelrc: false,
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            })
        ]
    };
};

export default [
    getSingleRollupConfig('lib/index.js', 'dist/index.js'),
    getSingleRollupConfig('lib/px2rem.js', 'dist/px2rem.js')
];
