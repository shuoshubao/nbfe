/*
 * @Author: fangt11
 * @Date:   2021-08-06 20:16:27
 * @Last Modified by:   fangt11
 * @Last Modified time: 2021-08-12 12:24:27
 */

const { React, antd } = window;
const { createElement } = React;
const { Modal } = antd;

window.addEventListener('load', () => {
    document.body.addEventListener('click', e => {
        const icon = e.target.closest('.anticon');
        if (!icon) {
            return;
        }
        const { classList, dataset } = icon;
        // ShowSourceCode
        if (classList.contains('action-showSourceCode')) {
            const { code } = dataset;
            const codeText = pako.inflate(new Uint8Array(code.split(',')), { to: 'string' });
            Modal.info({
                width: 800,
                maskClosable: true,
                okText: '关闭',
                className: 'modal-source-code',
                content: createElement(
                    'pre',
                    {},
                    createElement('code', {
                        dangerouslySetInnerHTML: { __html: codeText }
                    })
                )
            });
        }
        // Try in REPL
        if (classList.contains('action-showREPL')) {
            const { funcname, example } = dataset;
            const Examples = JSON.parse(pako.inflate(new Uint8Array(example.split(',')), { to: 'string' }));
            const source = [
                `require('lodash');`,
                `const { ${funcname} } = require('@nbfe/tools');`,
                '',
                Examples.reduce((prev, cur) => {
                    if (cur.includes('// => ')) {
                        prev.push(cur, '');
                    } else {
                        prev.push(cur);
                    }
                    return prev;
                }, [])
                    .join('\n')
                    .trim(),
                ''
            ]
                .join('\n')
                .trim();
            const time = Date.now();
            const domId = ['runkit', 'container', 'dom', time].join('-');
            Modal.info({
                width: 1200,
                maskClosable: true,
                okText: '关闭',
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
