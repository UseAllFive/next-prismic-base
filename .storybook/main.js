module.exports = {
  // Point at your stories
  stories: ['../components/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-next',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (baseConfig) => {
    const nextConfig = require('../next.config.js')

    // prevent storybook's default webpack setting to use file loader to resolve svg
    const fileLoaderRule = baseConfig.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.exclude = /\.svg$/

    baseConfig.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })

    //   Merge your next webpack config with this base
    return { ...nextConfig.webpack, ...baseConfig }
  },
}
