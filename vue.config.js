const AppConfig = require('./app.config');
const yargs = require('yargs').argv;
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    outputDir: 'dist/service',
    baseUrl: process.env.NODE_ENV === 'production' ? '/service/' : '/',
    productionSourceMap: process.env.NODE_ENV !== 'production',
    devServer: {
        host: '0.0.0.0',
        port: 8200,
        proxy: {
            '/api': {
                target: 'http://assistant.mei1.info',
                changeOrigin: true
            }
        }
    },
    pages: AppConfig,
    chainWebpack: config => {
        // 临时解决方案：https://github.com/vuejs/vue-cli/issues/1996#issuecomment-415022624
        config.plugins.delete('named-chunks');
        // 多页面参数配置
        Object.keys(AppConfig).forEach(name => {
            config.plugin(`html-${name}`).tap(args => {
                args[0].title = AppConfig[name].title;
                args[0].cdn = AppConfig[name].cdn;
                args[0].token =
                yargs.env == 'test' || process.env.NODE_ENV !== 'production'
                    ? '5a6f9c439b18d2a39b9e0b2a639a34a0'
                    : '3c1210a8346d103698ba8ce2129c637b';
                return args;
            });
        });
        config.resolve.alias
            .set('@', resolve('source'))
            .set('assets', resolve('source/assets'))
            .set('components', resolve('source/components'))
            .set('config', resolve('source/config'))
            .set('directives', resolve('source/directives'))
            .set('filter', resolve('source/filter'))
            .set('services', resolve('source/services'))
            .set('styles', resolve('source/styles'))
            .set('vendor', resolve('source/vendor'))
            .set('pages', resolve('source/pages'))
            .set('plugin', resolve('source/plugin'));
    },
    transpileDependencies: [
        /\/node_modules\/vue-echarts\//,
        /\/node_modules\/resize-detector\//
    ]
};
