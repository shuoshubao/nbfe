const getUa = () => {
  return window.navigator.userAgent
}

/**
 * isAndroid
 * @return {Boolean} 是否是Android
 * @example
 *
 * isAndroid();
 * // => false
 */
export const isAndroid = () => {
  const ua = getUa()
  ;['Android', 'Adr'].some(v => ua.includes(v))
}

/**
 * isIOS
 * @return {Boolean} 是否是IOS
 * @example
 * isIOS();
 * // => true
 */
export const isIOS = () => {
  const ua = getUa()
  return Boolean(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
}

/**
 * isIPhone
 * @return {Boolean} 是否是IPhone
 * @example
 * isIPhone();
 * // => true
 */
export const isIPhone = () => {
  const ua = getUa()
  return /\biPhone\b|\biPod\b/i.test(ua)
}

/**
 * isIPhoneX
 * @return {Boolean} 是否是IPhoneX
 * @example
 * isIPhoneX();
 * // => true
 */
export const isIPhoneX = () => {
  const { width, height } = window.screen
  if (!isIPhone()) {
    return false
  }
  return (height === 812 && width === 375) || (height === 896 && width === 414)
}
