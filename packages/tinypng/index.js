#!/usr/bin/env node

const { existsSync, statSync } = require('fs');
const { extname } = require('path');
const chalk = require('chalk');
const glob = require('glob');
const async = require('async');
const progress = require('progress');
const ora = require('ora');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const tinify = require('tinify');

const { argv } = yargs(hideBin(process.argv));

const entry = argv._;

const imageList = [];

const extensions = ['png', 'jpg', 'jepg'];

entry.forEach(v => {
    const extension = extname(v).replace('.', '');
    if (extensions.includes(extension)) {
        imageList.push(v);
    } else {
        imageList.push(...glob.sync(`${v}**/*.+(${extensions.join('|')})`));
    }
});

const selectedImageList = [...new Set(imageList)].sort().filter(v => {
    return existsSync(v);
});

const KEY_LIST = [
    'XXIRu48sw8x3SMA4cA0NixJgib573DPX',
    'V3Lt8Tm4a8fBcmvyajTxbak5S_bWsi20',
    'KckuU929qtv_nPK_czL6HKfcAJO9FCKm',
    'vWIxohgr_6Yte92ee3fB8QJb7K9iH8Ro',
    'n03RCY69hnW3yGyrz2Sx1dvNNp4NsnVl',
    'j9b8kB2m2Zx28kk1sN9KFlDHnpR9Mtz6',
    'wyCb1FTD1bDY8Qj3Bl11CDMqGPCKg0L1',
    'TrDd55gRdc1RH7K32HYHPvlbx5crb0MT',
    'VzjzXnvLyZncGtY4HzQFKlXst26mP68G'
];

const CompressionsOneMonth = 500;

const getCompressionsThisMonth = (key, bar) => {
    return new Promise((resolve, reject) => {
        tinify.key = key;
        tinify.validate(e => {
            if (e) {
                reject(e);
            } else {
                const compressionCount = CompressionsOneMonth - tinify.compressionCount;
                bar.tick(1, {
                    tokenText: `账户: ${key}; 当月可用余额: ${compressionCount}`
                });
                resolve(compressionCount);
            }
        });
    });
};

const compressImage = (key, imgPath, spinner) => {
    tinify.key = key;
    const source = tinify.fromFile(imgPath);
    spinner.text = `开始压缩图片: ${imgPath}`;
    return new Promise((resolve, reject) => {
        source.toFile(imgPath, e => {
            if (e) {
                spinner.fail(`图片压缩失败: ${imgPath}`);
                reject(imgPath);
            } else {
                spinner.succeed(`图片压缩成功: ${imgPath}`);
                resolve(imgPath);
            }
        });
    });
};

if (imageList.length === 0) {
    throw new Error('指定目录或路径未找到图片');
}

(async () => {
    try {
        const ProgressBar = new progress(':bar :tokenText', {
            complete: '✨',
            width: 1,
            total: KEY_LIST.length,
            curr: KEY_LIST.length + 1
        });

        console.log('正在从Tinypng获取信息, 请稍等...');

        const CompressionsList = await Promise.all(
            KEY_LIST.map(v => {
                return getCompressionsThisMonth(v, ProgressBar);
            })
        );

        const TotalCompressions = CompressionsList.reduce((prev, cur) => prev + cur, 0);

        if (CompressionsList.length === 0) {
            throw new Error('该账户当月可用余额已经用完了~');
        }

        const KEY_LIST_Compressions = CompressionsList.reduce((prev, cur, index) => {
            prev.push(...Array(cur).fill(KEY_LIST[index]));
            return prev;
        }, []);

        if (selectedImageList.length > TotalCompressions) {
            throw new Error(`共${selectedImageList.length}张图片, 账号剩余可用: ${TotalCompressions}`);
        }

        const spinner = ora('开始压缩图片').start();

        await Promise.all(
            async.mapLimit(selectedImageList, 5, async v => {
                const i = selectedImageList.indexOf(v);
                return await compressImage(KEY_LIST_Compressions[i], v, spinner);
            })
        )
            .then(() => {
                spinner.stop();
            })
            .catch(() => {
                spinner.stop();
            });
    } catch (e) {
        console.log(e);
    }
})();
