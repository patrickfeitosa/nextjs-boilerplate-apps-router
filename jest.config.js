// eslint-disable-next-line import/extensions
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = createJestConfig({
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/**/stories.ts(x)?',
    '!src/app/**',
    '!src/lib/registry.tsx',
    '!src/types/**',
    '!src/styles/**',
  ],
  // https://github.com/styled-components/styled-components/issues/4081
  // v6 of styled-components doesn't inject styles in test environment
  // we should to force it to use the browser version
  moduleNameMapper: {
    '^styled-components': 'styled-components/dist/styled-components.browser.cjs.js',
  },
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => ({
  ...(await config()),
  coverageProvider: 'v8',
  verbose: !process.env.CI,
});
