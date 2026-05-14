import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
export default [
 { ignores: ["node_modules/", ".husky/", "dist/", "build/"] },
 js.configs.recommended,
 ...tseslint.configs.recommended,
 prettier,
 {
 files: ["**/*.{js,mjs,cjs,ts}"],
 languageOptions: {
 globals: globals.browser,
 ecmaVersion: 2020,
 sourceType: "module"
 },
 rules: {
 "no-unused-vars": ["error", { "args": "none" }]
 }
 },
];
