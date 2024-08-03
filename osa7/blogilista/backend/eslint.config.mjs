import globals from "globals";
import js from "@eslint/js";
import stylisticJS from "@stylistic/eslint-plugin-js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJS,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": ["error", "always"],
      "@stylistic/js/no-trailing-spaces": "error",
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/js/arrow-spacing": ["error", { before: true, after: true }],
      "no-console": 1,
      eqeqeq: "error",
    },
  },
];
