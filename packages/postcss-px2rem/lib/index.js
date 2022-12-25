/*
 * @LastEditors: fangt11
 * @LastEditTime: 2020-12-29 20:49:30
 * @Description: copy from https://github.com/songsiqi/px2rem-postcss/blob/master/lib/index.js
 */

import postcss from 'postcss'
import Px2rem from './px2rem'

export default postcss.plugin('postcss-px2rem', function (options) {
  return function (css, result) {
    const oldCssText = css.toString()
    const px2remIns = new Px2rem(options)
    const newCssText = px2remIns.generateRem(oldCssText)
    const newCssObj = postcss.parse(newCssText)
    result.root = newCssObj
  }
})
