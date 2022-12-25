/**
 * 将 element-ui Form组件 的 validate 变成一个始终是resolved状态的promise, 不用写try-catch或者回调函数的形式
 * @param  {Function} [.validate] 校验方法
 * @return {Promise<Boolean>} 校验结果
 * @example
 *
 * const isValid = await validateFn(this.$refs.form.validate)
 * // => false
 */
export const pifyValidate = validateFn => {
  return new Promise(resolve => {
    validateFn(valid => {
      resolve(valid)
    })
  })
}
