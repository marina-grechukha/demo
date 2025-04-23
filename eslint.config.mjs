// @ts-check
import vitest from 'eslint-plugin-vitest'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '.nuxt',
      'node_modules',
    ],
  },
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['tests/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 2 }],
    },
  },
)
