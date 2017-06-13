var path = require('path');
var cooking = require('cooking');
var config = require('./config');
var tempPath = config.dev;
if (process.env.NODE_ENV === 'production' && process.argv[2] == 'lite') {
    tempPath = config.prod;
}
var env = require(`./config/${tempPath}`);

cooking.set({
    entry: {
        app: ['./src/main.js']
    },
    dist: './dist',
    template: './index.tpl',
    devServer: {
        port: 8100,
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
        // require('...')
    ],
    publicPath: env.publicPath,
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    extractCSS: '[name].[contenthash:7].css',
    alias: {
        'src': path.join(__dirname, 'src'),
        'assets': path.join(__dirname, 'src/assets'),
        'components': path.join(__dirname, 'src/components'),
        'config': path.join(__dirname, 'src/config'),
        'directives': path.join(__dirname, 'src/directives'),
        'filter': path.join(__dirname, 'src/filter'),
        'services': path.join(__dirname, 'src/services'),
        'styles': path.join(__dirname, 'src/styles'),
        'vendor': path.join(__dirname, 'src/vendor'),
        'pages': path.join(__dirname, 'src/pages'),
        'store': path.join(__dirname, 'src/store'),
        'signPath': path.join(__dirname, `config/${tempPath}`)
    },
    extends: ['vue2', 'lint', 'less', 'autoprefixer'],
    static: 'src/static'
});

module.exports = cooking.resolve();
