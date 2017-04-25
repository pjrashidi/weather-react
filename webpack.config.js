require('dotenv').config()
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const googleMapsAPIKey = process.env.GOOGLE_MAPS_KEY


module.exports = {
  entry: './js/ClientApp.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        include: path.resolve(__dirname, 'js'),
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'js'),
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      googleMapsAPIKey: googleMapsAPIKey,
      title: 'Custom template',
      template: 'my-index.ejs'
    })
  ]
}
