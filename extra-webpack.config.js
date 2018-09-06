const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'  
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
