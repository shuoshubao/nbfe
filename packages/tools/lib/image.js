import { pick } from 'lodash';

/**
 * 获取图片的尺寸
 * @param  {String} url [description]
 * @return {Object}     [description]
 * @example
 *
 * (async() => {
 *   const size = await getImageSize('https://ke.com/favicon.ico');
 *   console.log(size);
 * })();
 *
 * // => { width: 24, height: 24 }
 */
export const getImageSize = (url = '') => {
    return new Promise(reslove => {
        const img = new Image();
        img.src = url;
        img.onload = async () => {
            reslove(pick(img, ['width', 'height']));
        };
    });
};

/**
 * 将图片的 http-url 变成 base64
 * @param  {String} url [description]
 * @return {String}     [description]
 */
export const changeImageUrlToBase64 = url => {
    if (url.startsWith('data:image')) {
        return url;
    }
    return new Promise(reslove => {
        const img = new Image();
        img.src = url;
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const { width, height } = img;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            reslove(canvas.toDataURL('image/jpeg'));
        };
    });
};
