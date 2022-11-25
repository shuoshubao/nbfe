require('core-js');
const { readFileSync, writeFileSync } = require('fs');
const { removeSync, ensureDirSync, copySync } = require('fs-extra');
const { sync: globSync } = require('glob');
const { parseComments } = require('dox');
const { map, filter, sortBy, flatten, escape } = require('lodash');
const { createElement } = require('@nbfe/js2html');
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

// removeSync('docs/documents');
ensureDirSync('docs/documents');
copySync('CHANGELOG.md', 'docs/CHANGELOG.md');
writeFileSync('docs/assets/js/index.umd.js', readFileSync('dist/index.umd.js').toString().replaceAll('lodash.', '_.'));

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
    const docs = filter(parseComments(content.replaceAll('export ', '')), 'code');
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
            const DataSetExample = map(Example, 'string').map(v2 => {
                return Buffer.from(v2.trim()).toString('base64');
                return v2.trim();
            });
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
                                            class: 'anticon anticon-code-sandbox action-showREPL',
                                            'data-funcname': v.funcName,
                                            'data-example': Buffer.from(JSON.stringify(DataSetExample)).toString(
                                                'base64'
                                            )
                                        },
                                        text:
                                            '<svg viewBox="64 64 896 896" focusable="false" data-icon="code-sandbox" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"></path></svg>'
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
