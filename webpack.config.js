const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    entry: {
      main: './src/index.js',
      style: './src/main.css',
    },
  },
]);

const productionConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        excludeAssets: [/style.*.js/]
      }),
      new HtmlWebpackExcludeAssetsPlugin()
    ],
  },

  parts.extractCSS({
    use: ['css-loader', parts.autoprefix(), 'sass-loader']
  })
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },

  parts.loadCSS()
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};