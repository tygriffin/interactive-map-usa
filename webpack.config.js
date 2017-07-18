const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "bundle.js",
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            { from: "assets/usa-map.svg" },
        ])
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