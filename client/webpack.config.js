module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
    {
      test: /\.js?$/,
      devtool: 'inline-source-map',
      exclude: /(node_modules|bower_components)/,
      loaders: ["babel"],
    }
  ]
  }
};
