const isDevelopment = process.env === 'development';

module.exports = {
    title: 'tools',
    description: '工具库',
    author: 'shuoshubao',
    pluginsConfig: {
        'import-asset': {
            css: [
                'https://file.ljcdn.com/bs/antd/4.16.6/dist/antd.min.css',
                isDevelopment ? '/assets/style/site.css' : 'https://shuoshubao.github.io/nbfe/assets/style/site.css'
            ],
            js: [
                'https://file.ljcdn.com/bs/lodash/4.17.21/lodash.min.js',
                'https://file.ljcdn.com/bs/react/17.0.2/umd/react.production.min.js',
                'https://file.ljcdn.com/bs/react-dom/17.0.2/umd/react-dom.production.min.js',
                'https://file.ljcdn.com/bs/antd/4.16.6/dist/antd.min.js',
                isDevelopment ? '/assets/js/code.js' : 'https://shuoshubao.github.io/nbfe/assets/js/code.js'
            ]
        }
    }
};
