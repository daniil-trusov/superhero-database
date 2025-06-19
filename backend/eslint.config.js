import { defineConfig } from "eslint/config";
import globals from "globals";

import * as importPlugin from "eslint-plugin-import";
import * as nodePlugin from "eslint-plugin-node";
import * as prettierPlugin from "eslint-plugin-prettier";

export default defineConfig({
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    import: importPlugin,
    node: nodePlugin,
    prettier: prettierPlugin,
  },
  rules: {
    "no-console": "off",

    "import/no-useless-path-segments": "warn",
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/namespace": "error",
    "import/default": "error",
    "import/no-cycle": "warn",
    "import/no-self-import": "error",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],

    "prettier/prettier": "warn",
  },
});
