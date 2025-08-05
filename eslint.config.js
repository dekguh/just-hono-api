import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'build/', '*.min.js']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        console: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'no-unused-vars': 'off', // Turn off base rule as it can report incorrect errors
      '@typescript-eslint/no-unused-vars': 'off', // Turn off TypeScript unused vars rule
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',
          'args': 'after-used',
          'argsIgnorePattern': '^_'
        }
      ]
    }
  }
] 