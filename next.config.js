const path = require('path')

module.exports = {
  images: {
    domains: ['images.prismic.io'],
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'node_modules/slick-carousel/slick/'),
    ],
  },
  webpack: (_config) => {
    const config = _config
    config.module.rules.push({
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
    return config
  },
}
