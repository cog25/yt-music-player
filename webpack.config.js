const path = require("path");

module.exports = {
    mode: env.mode,
    entry: "./src/js/app.js",
    devtool: isDevMode ? "eval-source-map" : false,
    output: {
        filename: "[name].js",
        sourceMapFilename: "[file].map[query]",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
