const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { projectConfig, pathConfig, isDevelopment } = require('../config');

const rules = [
    ...projectConfig.loaders,
    {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader'
            }
        ],
        exclude: projectConfig.webpackExclude
    },
    {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true,
                    cacheDirectory: pathConfig.AwesomeTypescriptCacheDirectory,
                    configFileName: pathConfig.TsConfigFilePath
                }
            }
        ],
        exclude: projectConfig.webpackExclude
    },
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: [
                        '@babel/plugin-proposal-export-default-from',
                        '@babel/plugin-proposal-export-namespace-from',
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-syntax-jsx',
                        ['@babel/plugin-transform-runtime', { corejs: 2 }]
                    ],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false
                            }
                        ],
                        '@vue/babel-preset-jsx'
                    ]
                }
            }
        ],
        exclude: projectConfig.webpackExclude
    },
    {
        test: /\.s(c|a)ss$/,
        use: [isDevelopment ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    {
        test: /\.css$/,
        use: [isDevelopment ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
    },
    {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/image/[name].[hash].[ext]'
                }
            }
        ]
    },
    {
        test: /\.mp3$/,
        use: [
            {
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: 'static/voice/[name].[hash].[ext]'
                }
            }
        ]
    }
];

module.exports = rules;
