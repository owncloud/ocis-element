const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'apps/element-file-picker/',
    chunkFilename: '[name].element-file-picker.chunk.js',
    filename: 'element-file-picker.bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './node_modules/@ownclouders/file-picker/public/oidc-callback.html',
          to: 'oidc-callback.html'
        },
        {
          from: './node_modules/@ownclouders/file-picker/public/oidc-client.min.js',
          to: 'oidc-client.min.js'
        },
        { from: './index.html', to: 'index.html' },
        {
          from: './node_modules/@ownclouders/file-picker/dist/img',
          to: 'img'
        }
      ]
    })
  ]
}
