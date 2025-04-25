const config = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: (webpackConfig) => {
    webpackConfig.resolve.modules.push(`${process.cwd()}/src`);

    return webpackConfig;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
