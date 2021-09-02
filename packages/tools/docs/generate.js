require('core-js');
const { readFileSync, writeFileSync } = require('fs');
const { removeSync, ensureDirSync, copySync } = require('fs-extra');
const { sync: globSync } = require('glob');
const { parseComments } = require('dox');
const { sortBy, filter, flatten, escape } = require('lodash');
const { createElement } = require('@nbfe/js2html');

const files = globSync('lib/*.js').filter(v => !v.includes('index'));

const delHtmlTag = (str = '') => {
    if (str.startsWith('<p>')) {
        return str.slice(3, -4).replaceAll('\n', '<br />');
    }
    return str.replaceAll('\n', '<br />');
};

const MenuListText = [];

// removeSync('docs/documents');
ensureDirSync('docs/documents');
copySync('CHANGELOG.md', 'docs/CHANGELOG.md');
writeFileSync('docs/assets/js/index.umd.js', readFileSync('dist/index.umd.js').toString().replaceAll('lodash.', '_.'));

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

sortBy(files, v => {
    const fileName = v.split(/[\/|.]/)[1];
    return FilesConfig.findIndex(v2 => {
        return v2.category === fileName;
    });
}).forEach(v => {
    const fileName = v.split(/[\/|.]/)[1];
    const { categoryName = '', functions = [] } = FilesConfig.find(v2 => {
        return v2.category === fileName;
    });
    const content = readFileSync(v).toString();
    const exportList = content
        .split('\n')
        .filter(v => {
            return v.includes('export const');
        })
        .map(v => {
            const funcName = v.split(' ')[2];
            const text = v.replace('export const ', '').replace(' => {', '');
            const argText = text.replace(`${funcName} = `, '');
            const callText = `${funcName}(${argText})`.replace('((', '(').replace('))', ')');
            return {
                funcName,
                callText: callText.includes('new ') ? text : callText
            };
        });
    const docs = parseComments(content.replaceAll('export ', ''));
    const sortedExportList = sortBy(exportList, v2 => {
        const index = (functions || []).indexOf(v2.funcName);
        return index === -1 ? exportList.length : index;
    });
    const markdownText = sortedExportList
        .map(v => {
            const { description, tags, code } = docs.find(v2 => {
                return v2.ctx.name === v.funcName;
            });
            const Aliases = filter(tags, { type: 'alias' });
            const See = filter(tags, { type: 'see' });
            const Returns = filter(tags, { type: 'return' });
            const Example = filter(tags, { type: 'example' });
            return createElement({
                tagName: 'div',
                attr: {
                    class: 'item-method'
                },
                children: [
                    {
                        tagName: 'div',
                        attrs: {
                            id: v.funcName.toLowerCase(),
                            class: 'item-method-name',
                            style: {
                                marginTop: -65,
                                paddingTop: '65px'
                            }
                        },
                        children: [
                            {
                                tagName: 'div',
                                attrs: {
                                    class: 'item-method-name-area'
                                },
                                text: v.callText
                            }
                        ]
                    },
                    {
                        tagName: 'div',
                        attrs: {
                            class: 'item-method-content'
                        },
                        children: [
                            {
                                tagName: 'div',
                                text: delHtmlTag(description.summary)
                            },
                            ...flatten(
                                See.map(v => {
                                    const { string } = v;
                                    const isUrl = string.startsWith('http');
                                    return [
                                        {
                                            tagName: 'h4',
                                            text: 'See'
                                        },
                                        {
                                            tagName: 'a',
                                            attrs: {
                                                href: isUrl ? string : 'javascript:void(0)',
                                                target: isUrl ? '_blank' : undefined,
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            text: string
                                        }
                                    ];
                                })
                            ),
                            ...flatten(
                                Aliases.map(v => {
                                    const { string } = v;
                                    return [
                                        {
                                            tagName: 'h4',
                                            text: 'Aliases'
                                        },
                                        {
                                            tagName: 'div',
                                            attrs: {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            text: string
                                        }
                                    ];
                                })
                            ),
                            {
                                tagName: 'h4',
                                text: 'Arguments'
                            },
                            ...filter(tags, { type: 'param' }).map(v => {
                                const { name, typesDescription, description } = v;
                                return {
                                    tagName: 'div',
                                    children: [
                                        {
                                            tagName: 'strong',
                                            attrs: {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            text: name
                                        },
                                        {
                                            tagName: 'strong',
                                            attrs: {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            text: ` (${delHtmlTag(typesDescription)})`
                                        },
                                        {
                                            tagName: 'span',
                                            text: [':', delHtmlTag(description)].join(' ')
                                        }
                                    ]
                                };
                            }),
                            {
                                tagName: 'h4',
                                text: 'Returns'
                            },
                            ...Returns.map(v => {
                                const { typesDescription, description } = v;
                                return {
                                    tagName: 'span',
                                    children: [
                                        {
                                            tagName: 'strong',
                                            attrs: {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            text: `(${delHtmlTag(typesDescription)})`
                                        },
                                        {
                                            tagName: 'span',
                                            text: [':', delHtmlTag(description)].join(' ')
                                        }
                                    ]
                                };
                            }),
                            {
                                tagName: 'h4',
                                children: [
                                    {
                                        tagName: 'span',
                                        text: 'Example'
                                    },
                                    {
                                        tagName: 'i',
                                        attrs: {
                                            style: {
                                                marginLeft: 10,
                                                cursor: 'pointer'
                                            },
                                            ariaLabel: '图标: code',
                                            class: 'anticon anticon-code action-showREPL',
                                            'data-funcname': v.funcName,
                                            'data-example': Example.map(v => {
                                                return escape(v.string);
                                            })
                                                .join('')
                                                .replaceAll('\n', '__@@__')
                                        },
                                        text:
                                            '<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="code" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>'
                                    }
                                ]
                            },
                            {
                                tagName: 'div',
                                attrs: {
                                    style: {
                                        display: Example.length ? 'none' : 'block'
                                    }
                                },
                                text: '暂无'
                            },
                            ...Example.map((v, i) => {
                                const { string } = v;
                                return {
                                    tagName: 'pre',
                                    text: escape(string),
                                    attrs: {
                                        style:
                                            i === 0
                                                ? {}
                                                : {
                                                      marginTop: -16,
                                                      borderTop: '1px solid #fff'
                                                  }
                                    }
                                };
                            })
                        ]
                    }
                ]
            });
        })
        .join('\n');
    MenuListText.push(`- [${categoryName || fileName}](${fileName}.md)`);
    MenuListText.push(
        ...sortedExportList.map(v => {
            return `  - [${v.funcName}](${fileName}.md#${v.funcName})`;
        })
    );
    writeFileSync(`docs/documents/${fileName}.md`, markdownText);
});

writeFileSync('docs/documents/SUMMARY.md', MenuListText.join('\n'));
