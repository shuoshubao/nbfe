# Useage

```javascript
const getDocText = require('@nbfe/js2html');

const docText = getDocText(documentConfig => {
    // console.log(documentConfig);
    documentConfig.title = 'balabala';
    documentConfig.meta = [
        {
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }
    ];
});

console.log(docText);
```

# Return

```html
<!DOCTYPE html>
<html>
    <head>
        <title>bala</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="dns-prefetch" href="bala" />
        <link rel="stylesheet" href="static/a.css" />
        <script src="bala.js" crossorigin="anonymous"></script>
        <style>
            body {
                margin: 0;
            }
        </style>
    </head>
    <body class="body-development">
        <div id="app"></div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="bala.js" crossorigin="anonymous"></script>
        <script>
            console.log('123');
        </script>
    </body>
</html>
```

# Config

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
            __text: 'body {margin: 0;}'
        },
        {
            __text: fs.readFileSync('demo.css').toString()
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
            __text: 'console.log("123")'
        },
        {
            __text: fs.readFileSync('demo.js').toString()
        }
    ]
}
```

### mark

-   npm publish --registry https://registry.npmjs.org
