module.exports = {
  extends: ['airbnb', 'plugin:react-hooks/recommended'],
  rules: {
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/anchor-is-valid': [1], // a javascript:void(0)
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/alt-text': [0], // <img alt="" />
    'jsx-a11y/media-has-caption': [0],
    'react/function-component-definition': [0],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'react/no-typos': [0],
    'react/sort-comp': [0],
    'react/no-array-index-key': [0],
    'react/jsx-no-target-blank': [0],
    'react/jsx-props-no-spreading': [0],
    'react/no-unstable-nested-components': [0],
    'react/static-property-placement': [1],
    'react/forbid-prop-types': [0],
    'react/jsx-wrap-multilines': [0],
    'react/no-children-prop': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }]
  }
}
