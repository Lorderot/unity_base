var webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './www/src/app.js',
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      // exclude: /node_modules/,
      include: [/(@|ub)/],
      query: {
        presets: ['es2015']
      }
    }]
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            unsafe_comps: true,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            unsafe: true,
            warnings: true,
            screw_ie8: true,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: false,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            cascade: true,
            drop_console: false
          }
        }
      }),
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      BOUNDLED_BY_WEBPACK: true
    })
  ]
}
