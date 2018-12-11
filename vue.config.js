const AppConfig = require('./app.config');

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    outputDir: 'dist/brandCenter',
    baseUrl: process.env.NODE_ENV === 'production' ? '/brandCenter/' : '/',
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
