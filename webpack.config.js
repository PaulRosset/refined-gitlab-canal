'use strict';
const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => ({
  devtool: 'sourcemap',
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    options: './src/options.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
  plugins: [
    new CopyWebPackPlugin([
      {
        from: '*',
        context: 'src',
        ignore: '*.js',
      },
    ]),
    new ChromeExtensionReloader(),
  ],
});
