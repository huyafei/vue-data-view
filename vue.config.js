module.exports = {
  lintOnSave: false,
  publicPath: "./",
  // outputDir: 'dist', // 构建输出目录
  // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  // eslint-loader 是否在保存的时候检查
  // runtimeCompiler: true, // 运行时版本是否需要编译
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  //运行服务配置 host、port 和 https
  devServer: {
    // open: true, // 自动打开浏览器
    // host:'0.0.0.0', // 设置0.0.0.0则所有的地址都能访问
    port: "9999"
    //代理1，写法
    // proxy: 'http://localhost:8073'
    //代理2，写法
    // proxy: {
    //   '/v1': {
    //     target: 'http://localhost:8073/api/v1', // 目标代理服务器地址
    //     changeOrigin: true, //允许跨域
    //     ws: true,
    //     pathRewrite: {
    //       '^/v1': ''
    //     }
    //   }
    // }
  },
  css: {
    // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: `
        @import "@/assets/style/colors.scss";
        @import "@/assets/style/mixin.scss";
        `
      },
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            // 以设计稿750为例， 750 / 10 = 75
            //remUnit通常我们是根据设计图来定这个值，
            //假如设计图给的宽度是750，我们通常就会把remUnit设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。
            remUnit: 192
          })
        ]
      }
    }
  },
  configureWebpack: {
    externals: {
      AMap: "AMap"
    }
  }
};
