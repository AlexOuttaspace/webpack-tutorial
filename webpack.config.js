const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const glob = require('glob')

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    entry: {
      main: './src/index.js',
      style: glob.sync("./src/**/*.css"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        excludeAssets: [/style.*.js/]
      }),
      new HtmlWebpackExcludeAssetsPlugin()
    ],
  },

  parts.loadCSS(),
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', 'sass-loader']
  })
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};