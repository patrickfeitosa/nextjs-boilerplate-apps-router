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
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:storybook/recommended',
    'plugin:perfectionist/recommended-alphabetical-legacy',
  ],
  globals: {
    React: true,
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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'promise',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-use-before-define': [0, { classes: false, functions: false, variables: false }],
    // Disable default-param-last/no-restricted-exports due to redux reducers
    'default-param-last': 0,
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never', jsx: 'never', ts: 'never', tsx: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off', // For single Styled Component exports
    'jsx-a11y/media-has-caption': 'off',
    'linebreak-style': 'off', // Avoid LF/CRLF on Win/Linux/Mac
    'no-restricted-exports': 0,
    // Disable due TS Enum errors
    'no-shadow': 'off',
    'no-use-before-define': [0, { classes: false, functions: false, variables: false }],
    // Import orders
    'perfectionist/sort-imports': [
      'error',
      {
        customGroups: [
          {
            elementNamePattern: ['^next'],
            groupName: 'next',
          },
          {
            elementNamePattern: ['^styled'],
            groupName: 'styled-components',
          },
          {
            elementNamePattern: ['react$', '^react.+'],
            groupName: 'react',
          },
          {
            elementNamePattern: ['react$', '^react.+'],
            groupName: 'react',
          },
          {
            elementNamePattern: ['^@Assets\\/'],
            groupName: 'Assets',
          },
          {
            elementNamePattern: ['^@Components\\/'],
            groupName: 'Components',
          },
          {
            elementNamePattern: ['^@Containers\\/'],
            groupName: 'Containers',
          },
          {
            elementNamePattern: ['^@Constants\\/'],
            groupName: 'Constants',
          },
          {
            elementNamePattern: ['^@Contexts\\/'],
            groupName: 'Contexts',
          },
          {
            elementNamePattern: ['^@HOC\\/'],
            groupName: 'HOC',
          },
          {
            elementNamePattern: ['^@Hooks\\/'],
            groupName: 'Hooks',
          },
          {
            elementNamePattern: ['^@Icons\\/'],
            groupName: 'Icons',
          },
          {
            elementNamePattern: ['^@Layouts\\/'],
            groupName: 'Layouts',
          },
          {
            elementNamePattern: ['^@Mocks\\/'],
            groupName: 'Mocks',
          },
          {
            elementNamePattern: ['^@Pages\\/'],
            groupName: 'Pages',
          },
          {
            elementNamePattern: ['^@Resources\\/'],
            groupName: 'Resources',
          },
          {
            elementNamePattern: ['^@Routes\\/'],
            groupName: 'Routes',
          },
          {
            elementNamePattern: ['^@Services\\/'],
            groupName: 'Services',
          },
          {
            elementNamePattern: ['^@Store\\/'],
            groupName: 'Store',
          },
          {
            elementNamePattern: ['^@Styles\\/'],
            groupName: 'Styles',
          },
          {
            elementNamePattern: ['^@Templates\\/'],
            groupName: 'Templates',
          },
          {
            elementNamePattern: ['^@Tests\\/'],
            groupName: 'Tests',
          },
          {
            elementNamePattern: ['^@Types\\/'],
            groupName: 'Types',
          },
          {
            elementNamePattern: ['^@Utils\\/'],
            groupName: 'Utils',
          },
        ],
        environment: 'node',
        fallbackSort: { type: 'unsorted' },
        groups: [
          'next',
          'styled-components',
          'react',
          ['value-builtin', 'value-external'],
          ['Icons', 'Types', 'Constants'],
          'Assets',
          'Components',
          'Containers',
          'Contexts',
          'HOC',
          'Hooks',
          'Layouts',
          'Mocks',
          'Pages',
          'Resources',
          'Routes',
          'Services',
          'Store',
          'Styles',
          'Templates',
          'Tests',
          'Utils',
          ['type-parent', 'type-sibling', 'type-index'],
          ['value-parent', 'value-sibling', 'value-index'],
          'unknown',
        ],
        ignoreCase: true,
        internalPattern: ['^@/.+'],
        maxLineLength: undefined,
        newlinesBetween: 'always',
        order: 'asc',
        partitionByComment: false,
        partitionByNewLine: false,
        specialCharacters: 'keep',
        type: 'alphabetical',
      },
    ],
    'react/display-name': 'off',
    'react/function-component-definition': [1, {
      namedComponents: 'arrow-function',
    }],
    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', 'jsx', '.ts', '.tsx'],
    }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
