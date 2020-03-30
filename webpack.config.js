const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/env"]
          }
        }
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", "*"]
  }
};
