module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     //关闭尾随空格
     'no-trailing-spaces': 'off',
     //关闭强制对象打上引号
     'quotes': 'off',
     //关闭强制分号的位置
     'semi': 'off',
     'space-before-function-paren': 'off',
     'indent': 'off',
     'no-unreachable': 'off',
     'dot-notation': 'off',
     'prefer-const': 'off',
     'no-multi-spaces': 'off',
     'spaced-comment': 'off',
     'eqeqeq': 'off',
     'no-undef': 'off'
  }
}
