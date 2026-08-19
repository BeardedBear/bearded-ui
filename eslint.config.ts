import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "dist/**", "styleguide-dist/**"],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  // Même preset stylistique que beardify : double quotes, point-virgules, 2 espaces.
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: "1tbs",
    commaDangle: "always-multiline",
    indent: 2,
    jsx: false,
    quoteProps: "as-needed",
    quotes: "double",
    semi: true,
  }),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // Le <script> des SFC est en TypeScript.
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        parser: tseslint.parser,
        sourceType: "module",
      },
    },
  },

  {
    plugins: { perfectionist },
    rules: {
      ...perfectionist.configs["recommended-alphabetical"].rules,

      "@stylistic/indent-binary-ops": ["error", 2],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/max-len": [
        "error",
        { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreUrls: true },
      ],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
      "@stylistic/object-curly-newline": ["error", { consistent: true }],
      "@stylistic/operator-linebreak": ["error", "before"],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "no-debugger": "warn",

      // Gérés par le preset stylistic, qui formate aussi les templates.
      "vue/html-indent": "off",
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      // Les composants de la lib sont préfixés Bd : un seul mot après le préfixe suffit.
      "vue/multi-word-component-names": "off",
      // En TS, une prop optionnelle vaut undefined : pas besoin d'un défaut explicite.
      "vue/require-default-prop": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },

  // Scripts CLI : leur sortie console est l'interface utilisateur.
  {
    files: ["scripts/**/*.ts"],
    rules: { "no-console": "off" },
  },
);
