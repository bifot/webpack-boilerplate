const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('../styles/[name].css')

const config = {
  context: path.resolve(__dirname, 'src/js'),

  entry: {
    app: './app'
  },

  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: '[name].build.js',
    library: '[name]'
  },

  watch: process.env.NODE_ENV !== 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'es2015'
            ]
          }
        }
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: [
            {
              loader: 'style-loader',
            }
          ],
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    extractCSS
  ]
}

module.exports = config
