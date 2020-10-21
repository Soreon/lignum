module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    globalReturn: true,
  },
  env: {
    browser: true,
  },
  plugins: [
    'import',
  ],
  rules: {
    'max-len': 0,
    'no-console': 0,
    'no-param-reassign': ['error', { props: false }],
    'class-methods-use-this': 0,
    'no-bitwise': 0,
  },
};
