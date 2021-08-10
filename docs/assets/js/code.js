/*
 * @Author: fangt11
 * @Date:   2021-08-06 20:16:27
 * @Last Modified by:   fangt11
 * @Last Modified time: 2021-08-10 21:08:04
 */

const { React, antd } = window;
const { createElement } = React;
const { Modal } = antd;

window.addEventListener('load', () => {
    document.body.addEventListener('click', e => {
        const icon = e.target.closest('.anticon');
        // 展示源码
        if (icon && icon.classList.contains('action-showCode')) {
            const { funcname, example } = icon.dataset;
            const source = [
                `require('lodash');`,
                `const { ${funcname} } = require('@nbfe/tools');`,
                '',
                example
                    .replaceAll('__@@__', '\n')
                    .split('\n')
                    .reduce((prev, cur) => {
                        if (cur.includes('// => ')) {
                            prev.push(cur, '');
                        } else {
                            prev.push(cur);
                        }
                        return prev;
                    }, [])
                    .join('\n')
                    .trim()
                    .replaceAll('\n\n', '\n'),
                ''
            ].join('\n');
            const time = Date.now();
            const domId = ['runkit', 'container', 'dom', time].join('-');
            Modal.info({
                title: createElement('div', {}, [
                    createElement(
                        'span',
                        {
                            style: {
                                fontSize: 16
                            }
                        },
                        ['Try in REPL']
                    ),
                    createElement(
                        'span',
                        {
                            style: {
                                color: '#666',
                                fontSize: 12,
                                marginLeft: 10
                            }
                        },
                        [`可在浏览器控制台直接调用 tools.${funcname}`]
                    )
                ]),
                width: 1200,
                okText: '关闭',
                content: createElement(
                    'div',
                    {
                        id: domId
                    },
                    []
                )
            });
            setTimeout(() => {
                RunKit.createNotebook({
                    theme: 'atom-light-syntax',
                    element: document.getElementById(domId),
                    source
                });
            }, 0);
        }
    });
});
