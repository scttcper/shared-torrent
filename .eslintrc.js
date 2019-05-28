module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['xo-space/esnext', 'xo-typescript', 'prettier/@typescript-eslint'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'capitalized-comments': 0,
  },
};
