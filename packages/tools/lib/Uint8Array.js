/* eslint-disable default-case,no-bitwise */

/**
 * Utf8数组 转 字符串
 * 参考链接:
 * 链接1: [https://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript](https://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript)
 * 链接2:  [https://gist.github.com/wumingdan/759564f6cb887a55bceb](https://gist.github.com/wumingdan/759564f6cb887a55bceb)
 * @param  {Utf8Array} array Utf8数组
 * @return {String}       Utf8 数组转 字符串
 * @example
 *
 * var arr = new Uint8Array(5);
 * arr[0] = 0x3d;
 * arr[1] = 0x35f;
 * arr[2] = 0x35f;
 * arr[3] = 0x35e;
 * arr[4] = 0x35e;
 *
 * Utf8ArrayToString(arr);
 * // => '=__^^'
 */
export const Utf8ArrayToString = array => {
  let out = ''
  let i = 0
  const len = array.length
  let c
  let char2
  let char3

  while (i < len) {
    c = array[i++]
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c)
        break
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++]
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
        break
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0))
        break
    }
  }

  return out
}
