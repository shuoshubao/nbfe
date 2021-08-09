require('core-js');
const { readFileSync, writeFileSync } = require('fs');
const { removeSync, ensureDirSync, copySync } = require('fs-extra');
const { sync: globSync } = require('glob');
const { parseComments } = require('dox');
const { filter } = require('lodash');
const { createElement } = require('@nbfe/js2html');

const files = globSync('lib/*.js').filter(v => !v.includes('index'));

const delHtmlTag = (str = '') => {
    return str.replace(/<[^>]+>/g, '');
};

const MenuListText = [];

removeSync('docs/documents');
ensureDirSync('docs/documents');
copySync('CHANGELOG.md', 'docs/CHANGELOG.md');

// console.log(parseComments('const a = () => {console.log(1)}'))

files.slice(0, 1).forEach(v => {
    const fileName = v.split(/[\/|.]/)[1];
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
                callText
            };
        });
    const docs = parseComments(content.replaceAll('export ', ''));
    console.log(JSON.stringify(docs));
    const markdownText = exportList
        .map((v, i) => {
            const { description, tags, code } = docs[i];
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
                                children: [
                                    {
                                        tagName: 'span',
                                        text: v.callText
                                    },
                                    {
                                        tagName: 'i',
                                        attrs: {
                                            ariaLabel: '图标: code',
                                            class: 'anticon anticon-code action-showCode',
                                            'data-code': code,
                                        },
                                        children: [
                                            {
                                                tagName: 'svg',
                                                attrs: {
                                                    viewBox: '64 64 896 896',
                                                    focusable: 'false',
                                                    dataIcon: 'code',
                                                    width: '1em',
                                                    height: '1em',
                                                    fill: 'currentColor',
                                                    ariaHidden: 'true'
                                                },
                                                children: [
                                                    {
                                                        tagName: 'path',
                                                        attrs: {
                                                            d: 'M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
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
                                text: 'Example',
                            },
                            {
                                tagName: 'div',
                                attrs: {
                                    display: Example.length ? 'block' : 'none'
                                },
                                text: '暂无'
                            },
                            ...Example.map(v => {
                                return {
                                    tagName: 'pre',
                                    text: v.string
                                };
                            })
                        ]
                    }
                ]
            });
        })
        .join('\n');
    MenuListText.push(`- [${fileName}](${fileName}.md)`);
    MenuListText.push(
        ...exportList.map(v => {
            return `  - [${v.funcName}](${fileName}.md#${v.funcName})`;
        })
    );
    writeFileSync(`docs/documents/${fileName}.md`, markdownText);
});

writeFileSync('docs/documents/SUMMARY.md', MenuListText.join('\n'));
