var path = require('path');
var cooking = require('cooking');
var build = require('./build');
var isProd = process.env.NODE_ENV === 'production';

cooking.set({
    entry: build.entries(),
    dist: './dist/service',
    template: build.templates(),
    devServer: {
        port: 8200,
        // 输出文件目录的 URL 路径，注意这里的配置会覆盖下面的 publicPath
        publicPath: '/',
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://assistant.mei1.info',
                changeOrigin: true
            } 
        }
    },
    // production
    clean: true,
    hash: true,
    sourceMap: false,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: function(webpack) {
        return [
            require('postcss-px2rem')({
                remUnit: 37.5,
                remPrecision: 6
            })
        ];
    },
    publicPath: '/service/',
    assetsPath: 'static',
    urlLoaderLimit: 8 * 1024,
    extractCSS: isProd ? 'static/[name].[contenthash:7].css' : true,
    alias: {
        'assets': path.join(__dirname, 'source/assets'),
        'components': path.join(__dirname, 'source/components'),
        'config': path.join(__dirname, 'source/config'),
        'directives': path.join(__dirname, 'source/directives'),
        'filter': path.join(__dirname, 'source/filter'),
        'services': path.join(__dirname, 'source/services'),
        'styles': path.join(__dirname, 'source/styles'),
        'vendor': path.join(__dirname, 'source/vendor'),
        'pages': path.join(__dirname, 'source/pages'),
        'plugin': path.join(__dirname, 'source/plugin')
    },
    extends: ['vue2', 'lint', 'less', 'autoprefixer'],
    externals: build.externals()
});
isProd && cooking.add('output.filename', 'static/[name].[hash:7].js');
module.exports = cooking.resolve();
