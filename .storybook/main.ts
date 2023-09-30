const config = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials'],
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
};

export default config;
