module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['xo-space/esnext', 'xo-typescript'],
  rules: {
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'capitalized-comments': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
};
