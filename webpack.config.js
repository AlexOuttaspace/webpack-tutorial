const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    stats: "errors-only",
    host: process.env.HOST, 
    port: process.env.PORT, 
    open: true,
    overlay: true,

  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
    }),
  ],
};