const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const path = require('path')

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    entry: {
      main: './src/index.js',
      style: './src/main.css',
    },
  },

  parts.loadFonts()
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

  {
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },

  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        }
      },

      runtimeChunk: {
        name: "manifest",
      },
    },
  },

  parts.loadJavaScript({ exclude:[/node_modules/]}),

  parts.extractCSS({
    use: ['css-loader', parts.autoprefix(), 'sass-loader']
  }),

  parts.loadImages({
    options: {
      limit: 200,
      name: "images/[name].[ext]",
    },
  }),

  parts.generateSourceMaps({ type: "source-map" }),

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

  parts.loadCSS(),

  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[hash:4].[ext]",

    },
  }),

  parts.generateSourceMaps({ type: 'cheap-source-map' })

]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};