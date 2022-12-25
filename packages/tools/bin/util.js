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
]

const SvgIcons = {
  CodeOutlined:
    '<svg viewBox="64 64 896 896" focusable="false" data-icon="code" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 00308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 00-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>',
  CodeSandboxOutlined:
    '<svg viewBox="64 64 896 896" focusable="false" data-icon="code-sandbox" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"></path></svg>'
}

module.exports = {
  FilesConfig,
  SvgIcons
}
