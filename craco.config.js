// const CracoLessPlugin = require('craco-less')
const path = require('path')

const resolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets')
    },
  },
  devServer: {
    port: 3002,
    hot: true
  },
  // plugins: [
  //   {
  //     plugin: CracoLessPlugin,
  //     options: {
  //       lessLoaderOptions: {
  //         // modifyVars: { '@primary-color': '#1da57a' },
  //         javascriptEnabled: true
  //       }
  //     }
  //   }
  // ]
}