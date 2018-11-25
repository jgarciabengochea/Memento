const path = require('path');

module.exports = {
  entry: {
    main: './client/src/popup/index.jsx',
    view: './client/src/view-tab/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client/src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  devtool: 'source-map'
};