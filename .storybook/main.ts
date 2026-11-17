import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  stories: ['../src/components/**/*.stories.tsx'],
  // Path aliases come from tsconfig.json (single source of truth, same as Vitest)
  viteFinal: (viteConfig) => mergeConfig(viteConfig, { plugins: [tsconfigPaths()] }),
};

export default config;
