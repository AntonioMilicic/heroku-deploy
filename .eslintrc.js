module.exports = {
  plugins: [
    'react',
    'jest'
  ],
  extends: [
    'semistandard',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  rules: {
    'arrow-parens': 'off',
    'prefer-const': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  },
  settings: {
    'react': {
      'version': '16.4.2'
    }
  },
  globals: {
    document: true
  },
  env: {
    browser: true
  }
};
