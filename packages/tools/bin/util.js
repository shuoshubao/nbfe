// 优先级, 函数排序
const FilesConfig = [
    { category: 'date', categoryName: '日期' },
    { category: 'enum', categoryName: '枚举' },
    {
        category: 'route',
        categoryName: '路由',
        functions: ['search', 'stringifyUrl', 'linkTo', 'updateUrlQuery', 'getParams']
    },
    { category: 'qs', categoryName: 'qs' },
    { category: 'decimal', categoryName: '浮点数计算' },
    {
        category: 'dom',
        categoryName: 'DOM操作',
        functions: [
            'classNames',
            'download',
            'copyText',
            'setAttrs',
            'setStyle',
            'convertCssom',
            'suffixClassNames',
            'getCssText',
            'getWordWidth'
        ]
    },
    { category: 'rules', categoryName: '表单校验' },
    {
        category: 'types',
        categoryName: '类型',
        functions: ['isEmptyValue', 'isEmptyArray', 'isEmptyObject', 'isEmptyString', 'isEveryTruthy', 'isEveryFalsy']
    },
    { category: 'memoize', categoryName: '缓存' },
    { category: 'dev', categoryName: '调试' },
    { category: 'data', categoryName: '数据' },
    { category: 'react', categoryName: 'React' },
    { category: 'vue', categoryName: 'Vue' },
    { category: 'formatters', categoryName: '文本格式化' },
    { category: 'numeral', categoryName: '数值' },
    { category: 'html', categoryName: 'Html字符串' },
    { category: 'string', categoryName: '字符串处理' },
    { category: 'ua', categoryName: 'UA' },
    { category: 'image', categoryName: '图片' },
    { category: 'file', categoryName: '文件' },
    { category: 'Uint8Array', categoryName: 'Uint8Array' },
    { category: 'antd-locale', categoryName: 'antd-locale' }
];

module.exports = {
    FilesConfig
};
