/*global module:false*/
module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    var version = pkg.version;

    // dev, integ, qa, prod
    var env = grunt.option('env') || 'dev';

    var paths = {
        root: './',
        source: {
            root: 'src/',
            jsFiles: {
                weiui: [
                    'src/js/libs/router.min.js',
                    'src/js/libs/jquery.min.js',
                    'src/js/libs/jquery.min.map',
                    'src/js/libs/example.js',
                    'src/js/libs/router.bind.js',
                    'src/js/libs/router.userinfo.js',
                    'src/js/libs/router.sign.js',
                    'src/js/libs/router.echarts.js',
                    'src/js/libs/router.performance.js',
                    'src/js/libs/router.operationLog.js',
                    'src/js/libs/tmpl.js',
                    'src/js/libs/iscroll-probe.js',
                    'src/js/libs/jweixin-1.0.0.js',
                    'src/js/libs/LocalResizeIMG.js',
                    'src/js/libs/mobileBUGFix.mini.js',
                    'src/js/libs/swiper.jquery.min.js',
                    'src/js/libs/moment.min.js',
                    'src/js/libs/echarts.common.min.js'
                ],
                libs: [
                    'src/js/libs/tmpl.js'
                ],
                app: ['src/js/app/app.js',
                    'src/js/app/app.constant.js',
                    'src/js/app/app.tools.js',
                    'config/' + env + '/app.config.js',
                    'src/js/app/api/app.api.js',
                    'src/js/app/api/app.api.*.js',
                    'src/js/app/app.home.js',
                    'src/js/app/performance/app.performance.js',
                    'src/js/app/performance/app.performance.emp.js',
                    'src/js/app/performance/app.performance.appointment.js',
                    'src/js/app/performance/app.performance.order.js',
                    'src/js/app/performance/app.performance.rank.js',
                    'src/js/app/user/app.userinfo.js',
                    'src/js/app/sign/app.sign.js',
                    'src/js/app/echarts/app.member.js',
                    'src/js/app/echarts/app.employee.js',
                    'src/js/app/echarts/app.product.js',
                    'src/js/app/operationLog/operationLog_store.js'
                ]
            },
            cssFiles: {
                weiui: ['src/css/weui.min.css',
                    'src/css/example.css',
                    'src/css/swiper.css'
                ],
                app: ['src/less/app.less']
            }
        },
        dist: {
            root: 'dist/',
            css: 'dist/css/',
            js: 'dist/js/'
        },
        web: {
            root: 'WebContent/'
        },
        www: {
            root: 'www/'
        }
    };

    grunt.initConfig({
        pkg: pkg,
        concat: {
            'js-libs': {
                src: paths.source.jsFiles.libs,
                dest: paths.dist.js + 'libs.js',
            },
            'js-app': {
                src: paths.source.jsFiles.app,
                dest: paths.dist.js + 'app.js',
            }
        },
        less: {
            'css-app': {
                src: paths.source.cssFiles.app,
                dest: paths.dist.css + 'app.css',
            }
        },
        cssmin: {
            options: {
                rebase: false
            },
            'css-app': {
                src: paths.dist.css + 'app.css',
                dest: paths.dist.css + 'app.min.css',
            }
        },
        uglify: {
            'js-libs': {
                files: [{
                    src: paths.dist.js + 'libs.js',
                    dest: paths.dist.js + 'libs.min.js'
                }]
            },
            'js-app': {
                files: [{
                    src: paths.dist.js + 'app.js',
                    dest: paths.dist.js + 'app.min.js'
                }]
            },
            'js-weiui': {
                files: [{
                    src: 'src/js/libs/' + 'weiui.js',
                    dest: 'src/js/libs/' + 'weiui-min.js'
                }]
            }
        },
        copy: {
            'js-weiui': {
                files: [{
                    expand: true,
                    flatten: true,
                    src: paths.source.jsFiles.weiui,
                    dest: paths.dist.js
                }, ]
            },
            'css-weiui': {
                files: [{
                    expand: true,
                    flatten: true,
                    src: paths.source.cssFiles.weiui,
                    dest: paths.dist.css
                }, ]
            },
            'others': {
                files: [{
                    expand: true,
                    cwd: paths.source.root,
                    src: ['fonts/**', 'images/**', 'music/**', 'ueditor/**', 'robots.txt', 'css/others.min.css', 'weiui/**'],
                    dest: paths.dist.root
                }, ]
            },
            'web': {
                files: [{
                    expand: true,
                    cwd: paths.dist.root,
                    src: ['**'],
                    dest: paths.web.root
                }, ]
            },
            'www': {
                files: [{
                    expand: true,
                    cwd: paths.dist.root,
                    src: ['fonts/**', 'images/**', 'pages/**', 'music/**', 'template/**',
                        //'umeditor/**',
                        'index.html', 'robots.txt',
                        'css/weiui.min.css',
                        'css/app.min.css', 'js/weiui.min.js',
                        'js/libs.min.js', 'js/app.min.js'
                    ],
                    dest: paths.www.root
                }, ]
            },
            'app': {
                files: [{
                    expand: true,
                    cwd: paths.dist.root,
                    src: ['fonts/**', 'images/**', 'pages/**', 'music/**',
                        'index.html',
                        'css/weiui.min.css',
                        'css/app.min.css', 'js/weiui.min.js',
                        'js/libs.min.js', 'js/app.min.js'
                    ],
                    dest: '../mw-wechat-app/www'
                }, ]
            }
        },
        includereplace: {
            html: {
                files: [{
                    expand: true,
                    cwd: paths.source.root,
                    src: ['**/*.html', '!**/@*.html'],
                    dest: paths.dist.root,
                }]
            }
        },
        clean: {
            dist: paths.dist.root + '*',
            web: paths.web.root + '*',
            www: paths.www.root + '*'
        },
        compress: {
            www: {
                options: {
                    archive: 'downloads/mei1-saas-wechatb.v' + version + '.zip',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: paths.www.root,
                    src: ['**']
                }]
            }
        },
        replace: {
            version: {
                options: {
                    patterns: [{
                        json: {
                            "version": version
                        }
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['config/version.json'],
                    dest: 'downloads/'
                }]
            }
        },
        csslint: {
            all: {
                options: {
                    csslintrc: ".csslintrc"
                },
                src: ['src/css/*.css']
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: []
        },
        watch: {
            src: {
                files: [paths.source.root + '**'],
                tasks: ['web-dev'],
                options: {
                    livereload: 5001
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: paths.web.root,
                    port: 5000,
                    livereload: 5001,
                    open: 'http://localhost:5000/index.html',
                    // keepalive: false,
                    // middleware: function (connect, options, middlewares) {
                    //     var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                    //     var fs = require('fs');
                    //     var path = require('path');
                    //     var support = ['POST', 'PUT', 'DELETE'];
                    //     middlewares.unshift(function (req, res, next) {
                    //         // 单独处理POST请求 请求的地址必须是文件 这里没有进行rewrite处理
                    //         if (support.indexOf(req.method.toUpperCase()) != -1) {
                    //             console.log(req.url);
                    //             var filepath = path.join(options.base[0], req.url);
                    //             if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                    //                 return res.end(fs.readFileSync(filepath));
                    //             }
                    //         }
                    //         return next();
                    //     });
                    //     return [proxy].concat(middlewares);
                    // }
                },
                // proxies: [{
                //     context: '/auth/form',
                //     host: 'localhost',
                //     port: 8090,
                //     https: false,
                //     xforward: false,
                //     headers: {
                //         "x-custom-added-header": "sda"
                //     },
                //     hideHeaders: ['x-removed-header']
                // }]
            }
        }
    });

    // grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-replace');

    // Task
    grunt.registerTask('js', ['copy:js-weiui', 'concat:js-libs', 'uglify:js-libs', 'concat:js-app', 'uglify:js-app']);
    grunt.registerTask('js-dev', ['copy:js-weiui', 'concat:js-libs', 'concat:js-app']);
    grunt.registerTask('css', ['copy:css-weiui', 'less:css-app', 'cssmin:css-app']);
    grunt.registerTask('others', ['copy:others', 'includereplace']);
    grunt.registerTask('dist', ['clean:dist', 'js', 'css', 'others']);
    grunt.registerTask('dist-dev', ['clean:dist', 'js-dev', 'css', 'others']);
    grunt.registerTask('web', ['clean:web', 'dist', 'copy:web']);
    grunt.registerTask('web-dev', ['clean:web', 'dist-dev', 'copy:web']);
    grunt.registerTask('www', ['clean:www', 'dist', 'copy:www']);
    grunt.registerTask('app', ['dist', 'copy:app']);
    grunt.registerTask('release', ['www', 'replace:version', 'compress:www']);
    grunt.registerTask('lint', ['csslint', 'jshint']);
    grunt.registerTask('test', ['qunit']);
    //grunt.registerTask('default', ['configureProxies:server','web-dev', 'connect', 'watch']);
    grunt.registerTask('default', ['web-dev', 'connect', 'watch']);
};
