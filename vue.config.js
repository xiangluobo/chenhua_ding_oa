const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: './',
  // 运行 vue-cli-service build 时生成的生产环境构建文件的目录
  // 默认构建前清除文件夹(构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir),也可以是一个绝对路径
  indexPath: 'index.html',

  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,

  // 生产环境 sourceMap
  productionSourceMap: false,

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },

  // outputDir: 'dist', // 打包目录
  configureWebpack: (config) => { // webpack自定义配置
    // 生产环境打包分析体积
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      config.optimization = {
        runtimeChunk: 'single', // 将webpack运行时生成代码打包到runtime.js
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendors: {
              name: `vendors`,
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'initial'
            },
            common: {
              name: `common`,
              minChunks: 2,
              priority: -20,
              chunks: 'initial',
              reuseExistingChunk: true
            }
          }
        }
      }
      if (process.env.npm_config_report) {
        return {
          plugins: [
            new BundleAnalyzerPlugin()
          ]
        }
      }
    }
  },
  chainWebpack: config => { // CLI内部webpack配置
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  }
}

// 全局样式 变量、函数
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('src/styles/variables.less'),
        resolve('src/styles/mixin.less')
      ]
    })
}
