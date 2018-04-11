import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: true,
  template: path.resolve(__dirname, 'index.html'),
  chunks: ['vendor', 'bundle'],
});

const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist']);
const uglifyJSPlugin = new UglifyJSPlugin();
const babelPolyfill = 'babel-polyfill';
const main = './src/index.js';

const serverConf = {
  port: 3030,
  historyApiFallback: true,
  hot: true,
  host: '0.0.0.0',
  contentBase: [path.resolve(__dirname), path.resolve(__dirname, 'dist')],
};

export default (env) => {
  const isDev = env === 'dev';

  const definePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
    'process.env.API_URL': '"http://api.dailysportboss.com"',
    'process.env.API_VERSION': '"v1"',
  });

  const plugins = isDev ? [
    hotModuleReplacementPlugin,
    htmlWebpackPlugin,
    definePlugin,
  ] : [
    cleanWebpackPlugin,
    htmlWebpackPlugin,
    definePlugin,
    uglifyJSPlugin,
  ];

  const files = isDev ? [
    main,
    babelPolyfill,
    'react-hot-loader/patch',
  ] : [
    main,
    babelPolyfill,
  ];

  return {
    entry: {
      bundle: files,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /\.spec\.js$/,
          use: { loader: 'ignore-loader' },
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    devServer: isDev ? serverConf : {},
    resolve: {
      modules: [
        path.resolve(__dirname, 'dist'),
        'node_modules',
      ],
    },
    plugins,
  };
};
