const { environment } = require('@rails/webpacker')

module.exports = environment
const sassLoader = environment.loaders.get('sass')['use'].find(rule => rule['loader'] === 'sass-loader')
sassLoader.options = {
  ...sassLoader.options,
  implementation: require('sass'),
}

module.exports = environment
