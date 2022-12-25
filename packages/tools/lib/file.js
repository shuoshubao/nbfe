/**
 * base64 转成 blob
 * @param  {String} b64Data     base64数据
 * @param  {String} contentType blob的contentType
 * @param  {Number} [sliceSize=512]   [字符串切割比例]
 * @return {Blob}             blob数据
 */
export const b64toBlob = (b64Data, contentType = 'image/jpeg', sliceSize = 512) => {
  const byteCharacters = atob(b64Data.split(';base64,')[1])
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}
