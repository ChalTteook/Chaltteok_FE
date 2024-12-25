import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,
  {
    settings: {
      react: {
        version: "18.2", 
      },
    },
  },
  pluginPrettier.configs.recommended,
  configPrettier,
  {
    parser: tsParser,
    plugins: [tsPlugin, eslintPluginImport],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors', 
      'plugin:import/warnings', 
    ],
    rules: {
      "prettier/prettier": "error", 
      "no-console": ["warn", { allow: ["warn", "error"] }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/no-unresolved': 'error', 
    },
  },
];
