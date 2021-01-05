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
        css: `/*
 * @Description:
 * @version:
 * @Author: 吴婷婷
 * @Date: 2020-09-23 21:56:18
 * @LastEditTime: 2020-09-23 23:56:27
 */
.modal-detail {
    padding: 20px 20px 10px;

    color: #222;
    background-color: #f8f8f8;
    .money {
        margin-right: 5px;

        font-weight: bold;
        font-size: 18px;
        font-family: PingFang SC;
        line-height: 18px;


        vertical-align: text-top
    }
    .label {
        color: #999;
    }
}
.modal-detail {
    padding: 20px 20px 10px;

    color: #222;
    background-color: #f8f8f8;
    .money {
        margin-right: 5px;

        font-weight: bold;
        font-size: 18px;
        font-family: PingFang SC;
        line-height: 18px;


        vertical-align: text-top
    }
    .label {
        color: #999;
    }
    .modal-detail {
        padding: 20px 20px 10px;

        color: #222;
        background-color: #f8f8f8;
        .money {
            margin-right: 5px;

            font-weight: bold;
            font-size: 18px;
            font-family: PingFang SC;
            line-height: 18px;


            vertical-align: text-top
        }
        .label {
            color: #999;
        }
    }
}
.modal-label {
    display: inline-block;
    width: 100px;
}
`,
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
