const webpack = require('webpack')
const fs = require("fs-extra")
const path = require("path")

exports.onCreateWebpackConfig = ({ resolve, plugins, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        process: require.resolve("process/browser"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        asset: require.resolve("assert"),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
        util: "util"
      }),
    ],
  })
}

exports.onPostBuild = () => {
  console.log("Copying locales")
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales")
  )
}