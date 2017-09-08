const app = require('express')(),
      staticServer = require('serve-static'),
      webpackConfig = require('./webpack.dev.js'),
      webpack = require('webpack'),
      webpackMiddleware = require('webpack-dev-middleware'),
      hotMiddleware = require('webpack-hot-middleware'),
      path = require('path'),
      compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  headers: {'Access-Control-Allow-Origin': '*'}
}))

app.use(hotMiddleware(compiler, {heartbeat: 500}))

app.use(staticServer(
  path.resolve(__dirname),
  {index: false})
)

app.get('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(1488)
  .on('listening', () => console.log('# Development server started.'))
  .on('connection', sock => sock.setNoDelay(true))
