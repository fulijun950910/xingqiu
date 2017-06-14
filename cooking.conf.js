var path = require('path');
var cooking = require('cooking');

cooking.set({
    entry: {
        app: ['./service-subtotal/main.js']
    },
    dist: './dist/service-subtotal',
    template: './index.tpl',
    devServer: {
        port: 8200,
        publicPath: '/',
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://saas.test.mei1.info',
                changeOrigin: true
            }
        }
    },
    // production
    clean: true,
    hash: true,
    sourceMap: true,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        return [
            require('postcss-px2rem')({
                remUnit: 75,
                remPrecision: 6
            })
        ];
    ],
    publicPath: '/',
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    extractCSS: '[name].[contenthash:7].css',
    alias: {
        'service-subtotal': path.join(__dirname, 'service-subtotal'),
        'assets': path.join(__dirname, 'service-subtotal/assets'),
        'components': path.join(__dirname, 'service-subtotal/components'),
        'config': path.join(__dirname, 'service-subtotal/config'),
        'directives': path.join(__dirname, 'service-subtotal/directives'),
        'filter': path.join(__dirname, 'service-subtotal/filter'),
        'services': path.join(__dirname, 'service-subtotal/services'),
        'styles': path.join(__dirname, 'service-subtotal/styles'),
        'vendor': path.join(__dirname, 'service-subtotal/vendor'),
        'pages': path.join(__dirname, 'service-subtotal/pages'),
        'store': path.join(__dirname, 'service-subtotal/store'),
        'signPath': path.join(__dirname, `config/${tempPath}`)
    },
    extends: ['vue2', 'lint', 'less', 'autoprefixer'],
    static: 'service-subtotal/static'
});

module.exports = cooking.resolve();
