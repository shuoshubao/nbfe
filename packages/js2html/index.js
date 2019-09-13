const { uniqWith, isEqual, isArray, omit } = require('lodash');

const tabSpace = 4;

const spaceHtml = ' ';

const singleTag = ['meta', 'link'];

const getSpaceHtml = deep => spaceHtml.repeat(deep * tabSpace);

const attrsToHtml = (attrs = {}) => {
    return Object.entries(attrs)
        .reduce((prev, [key, val]) => {
            prev.push(val === '' ? key : `${key}="${val}"`);
            return prev;
        }, [])
        .join(spaceHtml);
};

const getLeftTagHtml = (tagName, attrs = {}) => {
    return `<${[tagName, attrsToHtml(attrs)].filter(Boolean).join(spaceHtml)}>`;
};

const getRightTagHtml = tagName => `</${tagName}>`;

const getHtml = (tagName, attrs = {}, text = '', deep = 0) => {
    let ret = '';
    if (singleTag.includes(tagName)) {
        ret = getLeftTagHtml(tagName, attrs);
    } else {
        ret = getLeftTagHtml(tagName, attrs) + text + getRightTagHtml(tagName);
    }
    return getSpaceHtml(deep) + ret;
};

const getDocText = documentConfig => {
    ['meta', 'headScript', 'style', 'bodyHtml', 'script'].forEach(v => {
        documentConfig[v] = documentConfig[v].filter(Boolean);
    });

    const titleString = getHtml('title', {}, documentConfig.title, 2);

    const metaString = documentConfig.meta.map(v => getHtml('meta', v, '', 2)).join('\n');

    const linkString = Object.entries(documentConfig.link)
        .reduce((prev, [key, val]) => {
            (isArray(val) ? val : [val]).forEach(v => {
                prev.push({ rel: key, href: v });
            });
            return prev;
        }, [])
        .map(v => getHtml('link', v, '', 2))
        .join('\n');

    const styleString = documentConfig.style
        .map(v => {
            if (typeof v === 'string') {
                return getHtml('link', { rel: 'stylesheet', href: v }, '', 2);
            }
            const __text = v.__text
                .split('\n')
                .filter(v2 => v2.trim())
                .join('');
            return getHtml('style', {}, __text, 2);
        })
        .join('\n');

    const bodyHtmlString = documentConfig.bodyHtml
        .map(v => {
            return v
                .split('\n')
                .filter(v2 => v2.trim())
                .map(v2 => getSpaceHtml(2) + v2)
                .join('\n');
        })
        .join('\n');

    const headScriptString = documentConfig.headScript
        .map(v => {
            const attrs = (() => {
                if (typeof v === 'string') {
                    return { src: v };
                }
                return omit(v, ['__text']);
            })();
            const text = (() => {
                if (v.__text) {
                    const __text = v.__text
                        .split('\n')
                        .filter(v2 => v2.trim())
                        .map(v2 => getSpaceHtml(3) + v2)
                        .join('\n');
                    return `\n${__text}\n${getSpaceHtml(2)}`;
                }
                return '';
            })();
            return getHtml('script', attrs, text, 2);
        })
        .join('\n');

    const scriptString = documentConfig.script
        .map(v => {
            const attrs = (() => {
                if (typeof v === 'string') {
                    return { src: v };
                }
                return omit(v, ['__text']);
            })();
            const text = (() => {
                if (v.__text) {
                    const __text = v.__text
                        .split('\n')
                        .filter(v2 => v2.trim())
                        .map(v2 => getSpaceHtml(3) + v2)
                        .join('\n');
                    return `\n${__text}\n${getSpaceHtml(2)}`;
                }
                return '';
            })();
            return getHtml('script', attrs, text, 2);
        })
        .join('\n');

    const documentString = [
        '<!DOCTYPE html>',
        '<html>',
        '    <head>',
        titleString,
        metaString,
        linkString,
        styleString,
        headScriptString,
        '    </head>',
        '    ',
        getLeftTagHtml('body', documentConfig.bodyAttrs),
        bodyHtmlString,
        scriptString,
        '    </body>',
        '</html>'
    ]
        .filter(Boolean)
        .join('\n');

    return `${documentString}\n`;
};

module.exports = convertDoc => {
    const documentConfig = {
        title: '',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: {},
        headScript: [],
        style: [],
        bodyAttrs: {},
        bodyHtml: [],
        script: []
    };

    const computedDocumentConfig = convertDoc(documentConfig) || documentConfig;

    Object.entries(computedDocumentConfig).forEach(([k, v]) => {
        if (isArray(v)) {
            computedDocumentConfig[k] = uniqWith(v, isEqual);
        }
    });

    return getDocText(computedDocumentConfig);
};
