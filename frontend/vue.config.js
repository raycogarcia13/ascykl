module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
      proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/static': {
        target: 'http://localhost:3000',
      }
    }
  }
}
