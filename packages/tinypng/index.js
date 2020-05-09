#!/usr/bin/env node

const { dirname } = require('path');
const chalk = require('chalk');
const glob = require('glob');
const inquirer = require('inquirer');
const progress = require('progress');
const ora = require('ora');
const fuzzypath = require('inquirer-fuzzy-path');
const tinify = require('tinify');

const KEY_LIST = [
    'XXIRu48sw8x3SMA4cA0NixJgib573DPX',
    'V3Lt8Tm4a8fBcmvyajTxbak5S_bWsi20',
    'KckuU929qtv_nPK_czL6HKfcAJO9FCKm',
    'vWIxohgr_6Yte92ee3fB8QJb7K9iH8Ro'
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

const imageList = glob.sync('src/**/*.+(png|jpg|jepg)');

if (imageList.length === 0) {
    throw new Error('src 目录下并没有图片');
}

const promiseInquirer = () => {
    inquirer.registerPrompt('fuzzypath', fuzzypath);
    return inquirer.prompt([
        {
            type: 'fuzzypath',
            name: 'entry',
            message: '请选择要压缩的图片或文件夹',
            pageSize: 30,
            rootPath: 'src',
            pathFilter: (isDirectory, nodePath) => {
                if (isDirectory) {
                    return imageList.map(v => dirname(v)).includes(nodePath);
                }
                return ['png', 'jpg', 'jepg'].some(v => nodePath.endsWith(`.${v}`));
            }
        }
    ]);
};

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
            throw new Error('该账户当月可用余额已经用完咯~');
        }

        const KEY_LIST_Compressions = CompressionsList.reduce((prev, cur, index) => {
            prev.push(...Array(cur).fill(KEY_LIST[index]));
            return prev;
        }, []);

        const answers = await promiseInquirer();

        const selectedImageList = imageList.filter(v => v.startsWith(answers.entry));

        if (selectedImageList.length > TotalCompressions) {
            throw new Error(`共${selectedImageList.length}张图片, 账号剩余可用: ${TotalCompressions}`);
        }

        const spinner = ora('开始压缩图片').start();

        Promise.all(
            selectedImageList.map((v, i) => {
                return compressImage(KEY_LIST_Compressions[i], v, spinner);
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
