const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: ["./src/index.js", "./styles/main.scss"],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "bundle.js",
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: "assets/usa-map.svg" },
        ]),
        new ExtractTextPlugin({
            filename: "[name].bundle.css",
            allChunks: true,
        }),
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
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    }
}