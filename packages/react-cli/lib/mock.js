const { basename, join } = require('path');
const bodyParser = require('body-parser');
const { packConfig } = require('./config');

module.exports = app => {
    app.use(bodyParser.json());

    app.use(async (req, res, next) => {
        let url = req.originalUrl;

        if (url.includes('?')) {
            [url] = url.split('?');
        }

        if (url === '/') {
            next();
            return;
        }

        const fileName = basename(url);

        // 有文件后缀的 当做是静态资源
        if (fileName.includes('.')) {
            next();
            return;
        }

        try {
            let actionPath = join(packConfig.rootPath, 'mock', url);
            const action = require(actionPath);
            const accept = req.get('Content-Type') || 'application/json';
            res.set('Content-Type', accept);
            actionPath = require.resolve(actionPath);
            if (typeof action === 'function') {
                // 引入的模块为方法，传入req, res，方法里可以拿到请求参数做一些简单业务处理
                // 返回执行action后的结果
                res.send(await action(req, res));
            } else {
                // 直接返回引入的文件
                res.send(action);
            }
            delete require.cache[actionPath]; // 删除模块缓存，下次会重新加载模块文件，使最新改动生效。
        } catch (e) {
            next();
        }
    });
};
