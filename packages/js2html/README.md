# 使用

```js
const {
    createElement,
    generateDocument,

    generateElement,
    generateAttrsText,
    convertCssom,
    getCssText,
    voidHtmlTags
} = require('@nbfe/js2html');
```

## createElement

```javascript
const { createElement } = require('@nbfe/js2html');

createElement({ tagName: 'div' }); // <div></div>
createElement({ tagName: 'div', text: 'text' }); // <div>text</div>
createElement({ tagName: 'div', attrs: { id: 1, name: 2 } }); // <div id="1" name="2"></div>
createElement({ tagName: 'div', text: 'text', attrs: { id: 1, name: 2 } }); // <div id="1" name="2">text</div>
createElement({ tagName: 'div', attrs: { id: 1, name: 2 }, children: [{ tagName: 'h1' }] }); // <div id="1" name="2"><h1></h1></div>
createElement({ tagName: 'div', attrs: { id: 1, name: 2 }, children: [{ tagName: 'h1', text: 'text' }] }); // <div id="1" name="2"><h1>text</h1></div>
createElement({
    tagName: 'div',
    attrs: { id: 1, name: 2 },
    children: [
        { tagName: 'h1', text: 'text' },
        {
            tagName: 'img',
            attrs: {
                src: '1.png',
                alt: '图片'
            }
        }
    ]
}); // <div id="1" name="2"><h1>text</h1><img src="1.png" alt="图片"></div>
```

## generateDocument

```javascript
const { generateDocument } = require('@nbfe/js2html');

const docText = generateDocument({
    title: 'bala',
    meta: [
        {
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }
    ],
    link: {
        'shortcut icon': '/static/favicon.ico',
        'dns-prefetch': 'bala'
    },
    headScript: [
        {
            src: 'bala.js',
            crossorigin: 'anonymous'
        }
    ],
    style: [
        'static/a.css',
        {
            text: 'body {margin: 0;}'
        }
    ],
    bodyAttrs: {
        class: 'body-development'
    },
    bodyHtml: ['<div id="app"></div>'],
    script: [
        {
            src: 'https://code.jquery.com/jquery-3.3.1.min.js'
        },
        {
            src: 'bala.js',
            crossorigin: 'anonymous'
        },
        {
            text: 'console.log("123")'
        }
    ]
});

console.log(docText);

```

### 输出

```html
<!DOCTYPE html><html><head><title>bala</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="static/a.css"><style>body {margin: 0;}</style><script src="bala.js" crossorigin="anonymous"></script></head><body class="body-development"><div id="app"></div><script src="https://code.jquery.com/jquery-3.3.1.min.js"></script><script src="bala.js" crossorigin="anonymous"></script><script>console.log("123")</script></body></html>
```

### documentConfig

```javascript
// documentConfig

{
    title: 'bala',
    meta: [
        {
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }
    ],
    link: {
        'shortcut icon': '/static/favicon.ico',
        'dns-prefetch': 'bala'
    },
    headScript: [
        {
            src: 'bala.js',
            crossorigin: 'anonymous'
        }
    ],
    style: [
        'static/a.css',
        {
            text: 'body {margin: 0;}'
        }
    ],
    bodyAttrs: {
        class: 'body-development'
    },
    bodyHtml: [
        '<div id="app"></div>'
    ],
    script: [
        'https://code.jquery.com/jquery-3.3.1.min.js',
        {
            src: 'bala.js',
            crossorigin: 'anonymous'
        },
        {
            text: 'console.log("123")'
        }
    ]
}
```

## generateTable

```js
const { generateTable } = require('@nbfe/js2html');

generateTable(columns = [], data = []);
```
