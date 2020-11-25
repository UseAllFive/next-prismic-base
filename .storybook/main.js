const path = require('path')

module.exports = {
  stories: ['../components/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        sasLoaderOptions: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, '../styles')],
          },
        },
      },
    },
  ],
  webpackFinal: async (baseConfig) => {
    const nextConfig = require('../next.config.js')
    return { ...nextConfig.webpack, ...baseConfig }
  },
}
