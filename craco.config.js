// const CracoLessPlugin = require('craco-less')
const path = require('path')

const resolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets')
    },
    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, {
        env, paths
    }) => {
        // paths.appPath='public'
        paths.appBuild = 'build'
        webpackConfig.output = {
          ...webpackConfig.output,
            // ...{
            //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
            //   chunkFilename: 'static/js/[name].js'
            // },
            path: path.resolve(__dirname, 'build'), // 修改输出文件目录
            publicPath: './'
        }
        return webpackConfig
    }
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
