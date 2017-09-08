const path = require('path'),
      webpack = require('webpack')

module.exports = {
  entry: ['webpack-hot-middleware/client?path=http://localhost:1488/__webpack_hmr&reload=true&timeout=1000&overlay=false', path.resolve(__dirname, './js/main.js')],

  output: {
    path: path.resolve(__dirname, '../dist/client/js'),
    filename: 'main.js',
    publicPath: '/js'
  },

  resolve: {
    unsafeCache: true
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"development"'}
    })
  ],

  performance: {
    maxEntrypointSize: 400000,
    assetFilter: assetFilename => assetFilename.endsWith('.js')
  },

  devtool: 'cheap-eval'
}