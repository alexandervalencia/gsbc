const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PUBLIC_PATH = '/public/';

const config = {
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist'),
    publicPath: PUBLIC_PATH,
  },
  plugins: [new ExtractTextPlugin('main.css')],
};

module.exports = {
  config: config,
  publicPath: PUBLIC_PATH,
};
