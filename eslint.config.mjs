import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import { defineConfig } from 'eslint/config';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  { ignores: ['dist/', 'node_modules/'] },
  {
    files: ['**/*.{ts}'],
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: false, rootDir: 'src', prefix: '@' },
      ],
      'unicorn/no-array-for-each': 'error',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    plugins: {
      // prettier,
      // 'import/recommended': unicorn,
      unicorn: unicorn,
      'simple-import-sort': simpleImportSort,
      'no-relative-import-paths': noRelativeImportPaths,
    },
  },

  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]);
