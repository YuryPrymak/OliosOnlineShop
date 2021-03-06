module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "max-len": ["error", {
      "code": 100,
      "ignoreTemplateLiterals": true,
      "ignoreUrls": true,
      ignorePattern: 'd="*?"'
    }],
    "comma-dangle": "off",
    "no-unused-expressions": "off",
    "no-plusplus": "off",
    "arrow-parens": "off",
    "keyword-spacing": "off",
    "no-param-reassign": "off",
    "arrow-body-style": "off"
  },
};
