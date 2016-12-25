var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var failPlugin = require('webpack-fail-plugin');
module.exports = {
    devtool: 'inline-source-map',
    entry: "./src/entry.ts",
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
        preLoaders: [ { test: /\.tsx?$/, loader: "tslint-loader" } ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        failPlugin
    ],
    resolve: {
        root: [ process.env.NODE_PATH || "node_modules" ],
        extensions: ['', '.js', '.ts']
    },
    tslint: {
        failOnHint: true
    }
};
