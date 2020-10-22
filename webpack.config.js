const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/lignum.js',
  output: {
    library: 'Lignum',
    libraryExport: 'Lignum',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'lignum.min.js',
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'lignum.min.css',
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },
};
