/*
 * @Author: fangt11
 * @Date:   2021-08-06 20:16:27
 * @Last Modified by:   fangt11
 * @Last Modified time: 2021-08-06 20:50:33
 */

const { React, antd } = window;
const { createElement } = React;
const { Modal } = antd;

window.addEventListener('load', () => {
    document.body.addEventListener('click', e => {
        const icon = e.target.closest('.anticon');
        // 展示源码
        if (icon && icon.classList.contains('action-showCode')) {
            Modal.info({
                title: '源码',
                width: 1000,
                okText: '知道了',
                content: createElement(
                    'pre',
                    {
                        style: {
                            margin: 0
                        }
                    },
                    [icon.dataset.code]
                )
            });
        }
    });
});
