const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets/',
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'assets/usa-map.svg' },
        ])
    ]
}