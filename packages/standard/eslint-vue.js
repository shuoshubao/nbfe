module.exports = {
  parser: 'vue-eslint-parser',
  extends: ['airbnb-base', 'plugin:vue/recommended'],
  rules: {
    'vue/html-indent': [0],
    'vue/singleline-html-element-content-newline': [0],
    'vue/max-attributes-per-line': [0],
    'vue/no-use-v-if-with-v-for': [0], // 禁止使用 v-if 和 v-for 指令在同一元素上
    'vue/multi-word-component-names': [0],
    'vue/no-reserved-component-names': [0],
    'vue/no-v-html': [0],
    'vue/attributes-order': [2], // 属性顺序
    'vue/order-in-components': [2], // vue组件顺序, name -> props -> data -> computed -> watch -> methods -> 生命周期
    'vue/html-self-closing': [2], // html标签自闭合
    'vue/no-lone-template': [2], // 不允许不必要的 ＜template＞
    'vue/attribute-hyphenation': [2, 'never'], // 属性名称为驼峰
    'vue/prop-name-casing': [2], // props名称为驼峰
    'vue/require-default-prop': [2], // props必须有默认值
    'vue/require-prop-types': [2], // props必须有类型
    'vue/component-definition-name-casing': [2], // 组件名称为帕斯卡
    'vue/component-name-in-template-casing': [2], // 组件名称为帕斯卡
    'vue/no-template-shadow': [2], // template 中的变量名与上文有重名
    'vue/this-in-template': [2] // template 中不要使用 this
  }
}
