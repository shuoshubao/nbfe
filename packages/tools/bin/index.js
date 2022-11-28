require('core-js');
const { readFileSync, writeFileSync } = require('fs');
const { ensureDirSync, copySync } = require('fs-extra');
const { parseComments } = require('dox');
const pako = require('pako');
const { map, filter, sortBy, flatten } = require('lodash');
const hljs = require('highlight.js');
const { createElement } = require('../dist');
const { FilesConfig } = require('./util');

const files = map(FilesConfig, 'category').map(v => {
    return ['lib', `${v}.js`].join('/');
});

const delHtmlTag = (str = '') => {
    if (str.startsWith('<p>')) {
        return str.slice(3, -4).replaceAll('\n', '<br />');
    }
    return str.replaceAll('\n', '<br />');
};

const MenuListText = [];

ensureDirSync('docs/documents');
copySync('CHANGELOG.md', 'docs/CHANGELOG.md');

files.forEach(v => {
    const fileName = v.split(/[/|.]/)[1];
    const { categoryName = '', functions = [] } = FilesConfig.find(v2 => {
        return v2.category === fileName;
    });
    const content = readFileSync(v).toString();
    const exportList = content
        .split('\n')
        .filter(v2 => {
            return v2.includes('export const');
        })
        .map(v2 => {
            const funcName = v2.split(' ')[2];
            const text = v2.replace('export const ', '').replace(' => {', '');
            const argText = text.replace(`${funcName} = `, '');
            const callText = `${funcName}(${argText})`.replace('((', '(').replace('))', ')');
            return {
                funcName,
                callText: callText.includes('new ') ? text : callText
            };
        });
    const docs = filter(parseComments(content.replaceAll('export ', '')), 'code');
    const sortedExportList = sortBy(exportList, v2 => {
        const index = (functions || []).indexOf(v2.funcName);
        return index === -1 ? exportList.length : index;
    });
    const markdownText = sortedExportList
        .map(v2 => {
            const { funcName, callText } = v2;
            const { description, tags } = docs.find(v3 => {
                return v3.ctx.name === funcName;
            });
            const Aliases = filter(tags, { type: 'alias' });
            const See = filter(tags, { type: 'see' });
            const Returns = filter(tags, { type: 'return' });
            const Example = filter(tags, { type: 'example' });
            const DataSetExample = map(Example, 'string').map(v3 => {
                return v3.trim();
            });
            return createElement(
                'div',
                {
                    className: 'item-method'
                },
                [
                    [
                        'div',
                        {
                            id: funcName.toLowerCase(),
                            className: 'item-method-name'
                        },
                        [
                            [
                                'div',
                                {
                                    className: 'item-method-name-area'
                                },
                                callText
                            ]
                        ]
                    ],
                    [
                        'div',
                        {
                            className: 'item-method-content'
                        },
                        [
                            ['div', {}, delHtmlTag(description.summary)],
                            ...flatten(
                                See.map(v3 => {
                                    const { string } = v3;
                                    const isUrl = string.startsWith('http');
                                    return [
                                        ['h4', {}, 'See'],
                                        [
                                            'a',
                                            {
                                                href: isUrl ? string : 'javascript:void(0)',
                                                target: isUrl ? '_blank' : undefined,
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            string
                                        ]
                                    ];
                                })
                            ),
                            ...flatten(
                                Aliases.map(v3 => {
                                    const { string } = v3;
                                    return [
                                        ['h4', {}, 'Aliases'],
                                        [
                                            'div',
                                            {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            string
                                        ]
                                    ];
                                })
                            ),
                            ['h4', {}, 'Arguments'],
                            ...filter(tags, { type: 'param' }).map(v3 => {
                                const { name, typesDescription } = v3;
                                return [
                                    'div',
                                    {},
                                    [
                                        [
                                            'strong',
                                            {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            name
                                        ],
                                        [
                                            'strong',
                                            {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            ` (${delHtmlTag(typesDescription)})`
                                        ],
                                        ['span', {}, [':', delHtmlTag(v3.description)].join(' ')]
                                    ]
                                ];
                            }),
                            ['h4', {}, 'Returns'],
                            ...Returns.map(v3 => {
                                const { typesDescription } = v3;
                                return [
                                    'span',
                                    {},
                                    [
                                        [
                                            'strong',
                                            {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            },
                                            `(${delHtmlTag(typesDescription)})`
                                        ],
                                        ['span', {}, [':', delHtmlTag(v3.description)].join(' ')]
                                    ]
                                ];
                            }),
                            [
                                'h4',
                                {},
                                [
                                    ['span', {}, 'Example'],
                                    [
                                        'i',
                                        {
                                            style: {
                                                marginLeft: 10,
                                                cursor: 'pointer'
                                            },
                                            ariaLabel: '图标: code',
                                            className: 'anticon anticon-code-sandbox action-showREPL',
                                            'data-funcname': funcName,
                                            'data-example': pako.deflate(JSON.stringify(DataSetExample)).toString()
                                        },
                                        '<svg viewBox="64 64 896 896" focusable="false" data-icon="code-sandbox" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"></path></svg>'
                                    ]
                                ]
                            ],
                            [
                                'div',
                                {
                                    style: {
                                        display: Example.length ? 'none' : 'block'
                                    }
                                },
                                '暂无'
                            ],
                            ...Example.map(v3 => {
                                const { string } = v3;
                                const { value } = hljs.highlight(string.trim(), { language: 'js' });
                                return [
                                    'pre',
                                    {},
                                    [
                                        [
                                            'code',
                                            {
                                                className: 'hljs language-js'
                                            },
                                            value
                                        ]
                                    ]
                                ];
                            })
                        ]
                    ]
                ]
            );
        })
        .join('\n');
    MenuListText.push(`- [${categoryName || fileName}](${fileName}.md)`);
    MenuListText.push(
        ...sortedExportList.map(v3 => {
            return `  - [${v3.funcName}](${fileName}.md#${v3.funcName})`;
        })
    );
    writeFileSync(`docs/documents/${fileName}.md`, markdownText);
});

writeFileSync('docs/documents/SUMMARY.md', MenuListText.join('\n'));
