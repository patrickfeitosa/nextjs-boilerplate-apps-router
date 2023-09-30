/**
 * ESLint configuration
 * http://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'promise',
    'import',
    'import-helpers',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 'off', // Avoid LF/CRLF on Win/Linux/Mac
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off', // For single Styled Component exports
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', 'jsx', '.ts', '.tsx'],
    }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never', jsx: 'never', ts: 'never', tsx: 'never',
    }],
    'react/jsx-one-expression-per-line': 'off',
    'react/no-danger': 'off',
    'react/display-name': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/media-has-caption': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': [0, { functions: false, classes: false, variables: false }],
    '@typescript-eslint/no-use-before-define': [0, { functions: false, classes: false, variables: false }],
    'react/require-default-props': 'off',
    // Import orders
    'import-helpers/order-imports': ['warn', {
      groups: [
        'absolute',
        '/^next/',
        '/^styled/',
        '/react$/',
        '/^react.+/',
        'module',
        '/^@Icons|@Types|@Constants/',
        '/^@Assets/',
        '/^@Components/',
        '/^@Containers/',
        '/^@Constants/',
        '/^@Contexts/',
        '/^@HOC/',
        '/^@Hooks/',
        '/^@Icons/',
        '/^@Layouts/',
        '/^@Mocks/',
        '/^@Pages/',
        '/^@Resources/',
        '/^@Routes/',
        '/^@Services/',
        '/^@Store/',
        '/^@Styles/',
        '/^@Templates/',
        '/^@Tests/',
        '/^@Types/',
        '/^@Utils/',
        ['parent', 'sibling', 'index'],
        '/styled/',
        '/styles/',
      ],
      newlinesBetween: 'always',
      alphabetize: { order: 'asc', ignoreCase: true },
    }],
    'react/function-component-definition': [1, {
      namedComponents: 'arrow-function',
    }],
    // Disable default-param-last/no-restricted-exports due to redux reducers
    'default-param-last': 0,
    'no-restricted-exports': 0,
    // Disable due TS Enum errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  globals: {
    React: true,
  },
};
