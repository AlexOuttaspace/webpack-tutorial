const CopyWebpackPlugin = require('copy-webpack-plugin')

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
})

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        include,
        exclude,

        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
})