import eslintPluginAngular from "@angular-eslint/eslint-plugin";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@angular-eslint": eslintPluginAngular,
      "@typescript-eslint": eslintPluginTypeScript,
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintPluginAngular.configs.recommended.rules,
      ...eslintPluginTypeScript.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": eslintPluginAngular,
    },
    rules: {
      ...eslintPluginAngular.configs["template/recommended"].rules,
    },
  },
];
