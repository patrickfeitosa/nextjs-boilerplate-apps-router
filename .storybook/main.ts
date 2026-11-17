import type { StorybookConfig } from '@storybook/nextjs';
import path from 'node:path';

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  stories: ['../src/components/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  // Mirror the aliases declared in tsconfig.json
  webpackFinal: async (webpackConfig) => {
    const src = path.resolve(process.cwd(), 'src');
    const alias = {
      '@': src,
      '@Api': path.join(src, 'api'),
      '@Components': path.join(src, 'components'),
      '@Domain': path.join(src, 'components/domain'),
      '@Hooks': path.join(src, 'hooks'),
      '@I18n': path.join(src, 'i18n'),
      '@Libs': path.join(src, 'lib'),
      '@Schemas': path.join(src, 'api/schemas'),
      '@Styles': path.join(src, 'styles'),
      '@Test': path.join(src, 'test'),
      '@Types': path.join(src, 'types'),
      '@Ui': path.join(src, 'components/ui'),
    };

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      alias: { ...webpackConfig.resolve?.alias, ...alias },
    };

    return webpackConfig;
  },
};

export default config;
