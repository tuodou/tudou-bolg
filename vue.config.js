module.exports = {
  css: {
    loaderOptions: {
      postcss: {}
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.97.118.178/api',
        // target: 'http://localhost:3000/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  lintOnSave: true
}
