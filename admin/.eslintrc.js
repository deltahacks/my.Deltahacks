module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'no-unused-vars': 'off',
    'no-unused-labels': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off'
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript'
  ]
};
