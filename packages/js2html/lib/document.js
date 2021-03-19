import { flatten, merge, isString, omit } from 'lodash';

import { createElement } from './createElement';

const defaultDocumentConfig = {
    title: '',
    meta: [
        {
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'initial-scale=1, maximum-scale=1, user-scalable=no'
        }
    ],
    link: [],
    headScript: [],
    style: [],
    bodyAttrs: {},
    bodyHtml: [],
    script: []
};

export const generateDocument = documentConfig => {
    const config = merge({}, defaultDocumentConfig, documentConfig);

    const { title, meta, link, headScript, style, bodyAttrs, bodyHtml, script } = config;

    const content = createElement({
        tagName: 'html',
        children: [
            {
                tagName: 'head',
                children: [
                    {
                        tagName: 'title',
                        text: title
                    },
                    ...meta.map(v => {
                        return {
                            tagName: 'meta',
                            attrs: v
                        };
                    }),
                    ...link.map(v => {
                        if (isString(v)) {
                            return {
                                tagName: 'link',
                                text: v
                            };
                        }
                        return {
                            tagName: 'link',
                            attrs: v
                        };
                    }),
                    ...style.map(v => {
                        // 外链
                        if (isString(v)) {
                            return {
                                tagName: 'link',
                                attrs: {
                                    rel: 'stylesheet',
                                    href: v
                                }
                            };
                        }
                        // 内联样式
                        if (v.text) {
                            return {
                                tagName: 'style',
                                text: v.text
                            };
                        }
                        return '';
                    }),
                    ...headScript.map(v => {
                        return {
                            tagName: 'script',
                            attrs: omit(v, 'text'),
                            text: v.text || ''
                        };
                    })
                ]
            },
            {
                tagName: 'body',
                attrs: bodyAttrs,
                children: [
                    ...flatten([bodyHtml]),
                    ...script.map(v => {
                        return {
                            tagName: 'script',
                            attrs: omit(v, 'text'),
                            text: v.text || ''
                        };
                    })
                ]
            }
        ]
    });
    return ['<!DOCTYPE html>', content].join('');
};
