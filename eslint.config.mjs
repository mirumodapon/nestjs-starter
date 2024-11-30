import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'lib',

  stylistic: {
    indent: 2,
    quotes: 'single'
  },

  typescript: true,
  jsonc: true,
  yaml: false,

  ignores: [
    '**/fixtures'
  ]
}, {
  rules: {
    'style/comma-dangle': ['error', 'never'],
    'style/semi': ['error', 'always'],
    'no-console': ['warn'],
    'camelcase': ['error'],
    'ts/explicit-function-return-type': ['off'],
    'node/prefer-global/process': ['off'],
    'ts/consistent-type-imports': ['off']
  }
});
