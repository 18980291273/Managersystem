module.exports = {
    /**
     * 设置在不同环境下打开目录的地址
     *  process.env.NODE_ENV === 'production|development'   表示生产环境
     *  'production'? '/': '/yuguoxy/' 三目运算符
     *  如果当前是在生产环境下，用根目录去访问 ’/‘
     *  否则是在开发环境下，访问路径在 ’/yuguoxy/‘ 子目录下
     *  生产环境访问目录  http://192.168.0.103:80/manger
     *  开发环境访问目录  http://192.168.0.103:8080/yuguoxy
     *  注意： 不同环境下访问路径时，端口号有差异
     */
    publicPath: process.env.NODE_ENV === 'production' ? '/': '/yuguoxy',
    // 编译打包输出文件路径 
    outputDir: 'dist',
    // 静态资源路径
    assetsDir: 'assets',

    // cdn引入常用公共资源，配置排除
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            // 'element-ui': 'ElementUI'
        }
    }
}