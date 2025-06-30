module.exports = {
  root: true,
  env: {
    node: true,
    // defineProps、defineEmitsのno-undef warning回避用
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    '@vue/eslint-config-typescript/recommended',
    'prettier',
    'plugin:prettier-vue/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: true,
      styleCSSVariableInjection: true
    }
  },
  plugins: ['import', 'sonarjs'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      },
      typescript: {
        extensions: ['.ts', '.tsx', '.vue'],
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],
    'no-else-return': [2, { allowElseIf: false }],
    'max-depth': [1, 3],
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
    eqeqeq: ['error', 'always']
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
  globals: {
    cy: true
  }
};
