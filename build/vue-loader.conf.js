var utils = require('./utils')
var config = require('../vue-config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
        extract: isProduction
    }),
    postcss: [require('postcss-px2rem')({ remUnit: 37.5, remPrecision: 9})],
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
