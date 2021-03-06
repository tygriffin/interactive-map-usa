const path = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, process.env.NODE_ENV === "production" ? "dist" : "build"),
        publicPath: "/assets/",
        filename: process.env.NODE_ENV === "production" ? "usa-map.js" : "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, "server")
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: "assets/usa-map.svg" },
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: process.env.NODE_ENV === "production"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"],
                        plugins: ["transform-class-properties"]
                    }
                }
            }
        ]
    }
}