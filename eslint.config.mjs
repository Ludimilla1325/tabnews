import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".env*",
      "*.config.js"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "warn",
      "prefer-const": "error"
    }
  }
];
