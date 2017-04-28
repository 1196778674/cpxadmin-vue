var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/js/build.js', './src/main.js']
  },
  output: {
    path: './build',
    publicPath: './',
    filename: 'dist/[name][hash].js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.(png|jpg|ico)$/, loader: 'file?name=image/[name].[ext]' },
      { test: /\.(png|jpg|ico)$/, loader: 'url?limit=10000'},
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: './src/download/*', to: './' },
      { from: './src/downloadpage/android/*', to: './' },
      { from: './src/downloadpage/ios/*', to: './' },
      { from: './favicon.ico', to: './' },
    ])
  ],
  vue: {
    loaders: {
      // css: ExtractTextPlugin.extract('css')
    }
  }
}
