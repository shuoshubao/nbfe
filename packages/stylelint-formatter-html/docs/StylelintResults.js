window.StylelintResults = [
    {
        source: 'src/util/2.css',
        deprecations: [],
        invalidOptionWarnings: [],
        parseErrors: [],
        errored: false,
        css: '',
        warnings: [],
        ignored: undefined
    },
    {
        source: 'src/containers/demo1/4.scss',
        deprecations: [],
        invalidOptionWarnings: [],
        parseErrors: [],
        errored: true,
        css: '',
        warnings: [
            {
                line: 3,
                column: 1,
                rule: 'prettier/prettier',
                severity: 'error',
                text: 'Delete "⏎" (prettier/prettier)'
            },
            {
                line: 2,
                column: 12,
                rule: 'color-hex-length',
                severity: 'error',
                text: 'Expected "#333333" to be "#333" (color-hex-length)'
            }
        ],
        ignored: undefined
    }
];
