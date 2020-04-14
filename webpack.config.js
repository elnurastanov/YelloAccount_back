const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'back.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules')
        }
    }
};