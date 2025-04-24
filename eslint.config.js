import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // ─── Ignore built files ─────────────────────────────────────────────────────
  // Skip linting in the "dist" folder, where compiled output lives
  { ignores: ['dist'] },

  {
    // ─── File targeting ─────────────────────────────────────────────────────────
    // Apply these settings to all JavaScript and JSX files in the project
    files: ['**/*.{js,jsx}'],

    // ─── Language/parsing options ───────────────────────────────────────────────
    languageOptions: {
      ecmaVersion: 2020,              // allow syntax up through ES2020
      globals: globals.browser,       // define standard browser globals (window, document, etc.)
      parserOptions: {
        ecmaVersion: 'latest',        // support the newest ECMAScript features
        ecmaFeatures: { jsx: true },  // enable parsing of JSX syntax
        sourceType: 'module',         // treat files as ES modules (import/export)
      },
    },

    // ─── Plugins ────────────────────────────────────────────────────────────────
    plugins: {
      'react-hooks': reactHooks,           // enforces the rules of React Hooks
      'react-refresh': reactRefresh,       // integrates with React Fast Refresh
    },

    // ─── Rules ─────────────────────────────────────────────────────────────────
    rules: {
      // Include all the recommended core ESLint rules
      ...js.configs.recommended.rules,

      // Include the recommended rules for React Hooks (e.g. exhaustive-deps)
      ...reactHooks.configs.recommended.rules,

      // Customize "no-unused-vars" to ignore variables starting with uppercase or underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Warn if non-component exports are included when using React Refresh,
      // but allow constants to be exported alongside components
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
