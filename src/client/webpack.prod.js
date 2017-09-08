const path = require('path'),
      webpack = require('webpack'),
      OptimizeJsPlugin = require('optimize-js-plugin')

module.exports = {
  entry: path.resolve(__dirname, './js/main.js'),

  output: {
    path: path.resolve(__dirname, '../dist/client/js'),
    filename: 'main.js'
  },

  resolve: {
    alias: {
      axios: 'axios/dist/axios.min',
      bluebird: 'bluebird/js/browser/bluebird.core.min'
    }
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"production"'}
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: false,
        unsafe: true
      },
      mangle: {except: ['document']}
    }),
    new OptimizeJsPlugin({sourceMap: false})
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  }
}