const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const __NODE_ENV__ = process.env.NODE_ENV
const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'



module.exports = {
  mode: __NODE_ENV__,
  entry: {
    main: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', 'scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css|\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.js|\.ts|\.jsx|\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'components'),
        ],
        loader: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
      async: false,
    }),
    // 将TypeScript类型检查错误以弹框提示
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: true,
      skipSuccessful: true,
    }),
  ],
  devServer: {
    contentBase: path.join('./src'),
    compress: true,
    port: 1200,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
}