const path = require('path')

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
  }
}
