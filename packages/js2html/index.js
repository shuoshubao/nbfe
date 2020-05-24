const { merge, get, isString, isObject } = require('lodash');

const defaultDocumentConfig = {
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
    link: [],
    headScript: [],
    style: [],
    bodyAttrs: {},
    bodyHtml: '',
    script: []
};

const singleTag = ['meta', 'link'];

const attrsStringify = (attrs = {}) => {
    return Object.entries(attrs)
        .reduce((prev, [key, val]) => {
            prev.push(val === '' || val === true ? key : `${key}="${val}"`);
            return prev;
        }, [])
        .join(' ');
};

const getElementHtml = (tagName = '', attrs = {}, text = '') => {
    const attrsString = attrsStringify(attrs);
    if (singleTag.includes(tagName)) {
        return `<${tagName} ${attrsString}>`;
    }
    return `<${tagName} ${attrsString}>${text}</${tagName}>`;
};

const renderDocument = ({
    title = '',
    meta = '',
    link = '',
    style = '',
    headScript = '',
    script = '',
    bodyAttrs = {},
    bodyHtml = ''
}) => {
    const result = `
        <!DOCTYPE html>
        <html>
        <head>
            ${title}
            ${meta}
            ${link}
            ${style}
            ${headScript}
        </head>
        <body ${attrsStringify(bodyAttrs)}>
            ${bodyHtml}
            ${script}
        </body>
        </html>
    `;
    return result
        .split('\n')
        .filter(v => v.trim())
        .join('\n');
};

const getDocText = documentConfig => {
    const config = merge({}, defaultDocumentConfig, documentConfig);

    const { title, meta, link, headScript, style, bodyAttrs, bodyHtml, script } = config;

    const titleString = getElementHtml('title', {}, title);

    const metaString = meta
        .map(v => {
            return getElementHtml('meta', v);
        })
        .join('\n');

    const linkString = link
        .map(v => {
            return getElementHtml('link', v);
        })
        .join('\n');

    const styleString = style
        .map(v => {
            // 外链
            if (isString(v)) {
                return getElementHtml('link', {
                    rel: 'stylesheet',
                    href: v
                });
            }
            // 内联
            const styleText = get(v, 'text', '');
            if (styleText) {
                return getElementHtml('style', {}, styleText);
            }
            return '';
        })
        .join('\n');

    const getScriptString = (scriptList = []) => {
        return scriptList
            .map(v => {
                // 外链
                if (isString(v)) {
                    return getElementHtml('script', { src: v });
                }
                // 内联
                const scriptText = get(v, 'text', '');
                if (scriptText) {
                    return getElementHtml('script', {}, scriptText);
                }
                if (isObject(v)) {
                    return getElementHtml('script', v);
                }
                return '';
            })
            .join('\n');
    };

    const documentHtml = renderDocument({
        title: titleString,
        meta: metaString,
        link: linkString,
        style: styleString,
        bodyAttrs,
        bodyHtml,
        headScript: getScriptString(headScript),
        script: getScriptString(script)
    });
    return documentHtml;
};

module.exports = getDocText;
