module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

