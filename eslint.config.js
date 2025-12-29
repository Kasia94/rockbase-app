import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Prettier config
  prettierConfig,

  {
    ignores: ['.angular/**', 'dist/**', 'node_modules/**', '.history/**'],
  },

  // TypeScript
  {
    files: ['**/*.ts'],
    ignores: ['server.ts', 'main.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...angularPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // HTML templates
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
  {
    files: ['server.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.server.json',
        tsconfigRootDir: import.meta.dirname,
      },
      // env: {
      //   node: true,
      // },
    },
    rules: {
      // Node nie potrzebuje Angularowych reguł
      '@angular-eslint/no-empty-lifecycle-method': 'off',
    },
  },
];
