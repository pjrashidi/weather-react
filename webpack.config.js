module.exports = {
  entry: './js/ClientApp.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  }
}
