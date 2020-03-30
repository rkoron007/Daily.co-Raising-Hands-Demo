const webpack = require("webpack");
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        SECRET_API_KEY: JSON.stringify(process.env.SECRET_API_KEY),
        NODE_ENV:
          JSON.stringify(process.env.NODE_ENV) || JSON.stringify("development")
      }
    })
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".js", "*"]
  }
};
