const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    title: 'tools',
    description: '工具库',
    author: 'shuoshubao',
    pluginsConfig: {
        'import-asset': {
            css: [
                'https://file.ljcdn.com/bs/antd/4.16.6/dist/antd.min.css',
                isDevelopment ? '/assets/css/site.css' : 'https://shuoshubao.github.io/tools/assets/css/site.css',
                'https://unpkg.com/highlight.js@11.7.0/styles/vs2015.css'
            ],
            js: [
                'https://file.ljcdn.com/bs/lodash/4.17.21/lodash.min.js',
                'https://file.ljcdn.com/bs/react/17.0.2/umd/react.production.min.js',
                'https://file.ljcdn.com/bs/react-dom/17.0.2/umd/react-dom.production.min.js',
                'https://file.ljcdn.com/bs/antd/4.16.6/dist/antd.min.js',
                'https://embed.runkit.com',
                'https://unpkg.com/@nbfe/tools@latest/dist/index.min.js',
                'https://unpkg.com/pako@2.1.0/dist/pako.min.js',
                isDevelopment ? '/assets/js/code.js' : 'https://shuoshubao.github.io/tools/assets/js/code.js'
            ]
        }
    }
};
