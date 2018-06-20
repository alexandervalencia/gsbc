const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');

module.exports = merge(
    common.config,
    {
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.DefinePlugin(
                {
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                }
            ),
            new UglifyJsPlugin(),
        ]
    }
);
