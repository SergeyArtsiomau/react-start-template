import path from 'path';

const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (webpackConfig, { configType }) => {
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      src: path.join(__dirname, '../src'),
    };

    if (configType === 'PRODUCTION') {
      webpackConfig.output = webpackConfig.output || {};
      // Storybook публикуется в подкаталоге /storybook/ на GitHub Pages
      webpackConfig.output.publicPath = '/react-start-template/storybook/';
      // GitHub Pages не отдаёт файлы с символом ~ в имени
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        runtimeChunk: {
          name: 'runtime-main',
        },
      };
    }

    return webpackConfig;
  },
};

export default config;
