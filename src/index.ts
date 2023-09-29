#!/usr/bin/env node

import { ESLint } from "eslint";

const eslintOptions: ESLint.Options = {
  baseConfig: {
    env: { browser: true, es2021: true },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:perfectionist/recommended-natural",
      "airbnb",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "module",
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react", "prettier", "perfectionist"],
    rules: {
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "object-curly-newline": "off",
      "prettier/prettier": "warn",
      quotes: ["error", "double"],
      "react/jsx-filename-extension": "off",
      "react/jsx-indent": "warn",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
    },
  },
};

async function lint() {
  const eslint = new ESLint(eslintOptions);
  const results = await eslint.lintFiles(".");
  await ESLint.outputFixes(results);
  const stylishFormatter = await eslint.loadFormatter("stylish");
  const resultText = stylishFormatter.format(results);

  console.log(resultText);
}

async function fix() {
  const eslint = new ESLint({ ...eslintOptions, fix: true });
  const results = await eslint.lintFiles(".");
  await ESLint.outputFixes(results);
  const stylishFormatter = await eslint.loadFormatter("stylish");
  const resultText = stylishFormatter.format(results);

  console.log(resultText);
}

async function main() {
  if (process.argv[2] === "lint") {
    return lint();
  }
  if (process.argv[2] === "fix") {
    return fix();
  }
  console.error('Invalid command. Use "lint".');
}

main();
