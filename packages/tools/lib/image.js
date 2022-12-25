import { pick } from 'lodash'

/**
 * 获取图片的尺寸
 * @param  {String} url 图片的url
 * @return {Object}     图片的尺寸 { width, height }
 * @example
 *
 * (async() => {
 *   const size = await getImageSize('https://github.githubassets.com/favicons/favicon.png');
 *   console.log(size);
 * })();
 *
 * // => { width: 24, height: 24 }
 */
export const getImageSize = (url = '') => {
  return new Promise(reslove => {
    const img = new Image()
    img.src = url
    img.onload = async () => {
      reslove(pick(img, ['width', 'height']))
    }
    img.onerror = async () => {
      reslove({ width: 0, height: 0 })
    }
  })
}

/**
 * 将图片的 http-url 变成 base64
 * @param  {String} url 图片的url
 * @return {String}     图片的base64数据
 */
export const changeImageUrlToBase64 = url => {
  if (url.startsWith('data:image')) {
    return url
  }
  return new Promise(reslove => {
    const img = new Image()
    img.src = url
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const { width, height } = img
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      reslove(canvas.toDataURL('image/jpeg'))
    }
  })
}
