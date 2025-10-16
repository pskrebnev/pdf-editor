import { configs } from '@eslint/js';
import tsPlugin, { configs as _configs } from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { rules as _rules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ..._configs.recommended.rules,
      ..._rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];