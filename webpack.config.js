const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '',
    filename: 'bundle.js',
  },
  mode: process.env.MODE,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/transpiled',
          name: '[name]_[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'env.LOCAL_URL': JSON.stringify(process.env.LOCAL_URL),
      'env.PORT': process.env.PORT,
    }),
  ],
};
