var gulp = require('gulp');
var browserSync = require('browser-sync');
var yargs = require('yargs').argv;
var proxy = require('http-proxy-middleware');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var less = require('gulp-less');
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
let cleanCSS = require('gulp-clean-css');
var rev = require('gulp-rev-append');
var replace = require('gulp-replace');
var reload = browserSync.reload;

var dist = {
    root: __dirname + '/dist',
    css: __dirname + '/dist/css',
    js: __dirname + '/dist/js'
};

var option = {
    base: 'src'
};

var _minify = yargs.env != 'dev';

var htmlFiles = ['src/**/*.html', 'src/!**/@*.html'];
var jsFiles = {
    weiui: [
        'src/js/libs/router.min.js',
        'src/js/libs/jquery.min.js',
        'src/js/libs/fastclick.min.js',
        'src/js/libs/jquery.min.map',
        'src/js/libs/example.js',
        'src/js/libs/router.bind.js',
        'src/js/libs/router.sign.js',
        'src/js/libs/router.echarts.js',
        'src/js/libs/router.performance.js',
        'src/js/libs/router.operationLog.js',
        'src/js/libs/router.serviceLog.js',
        'src/js/libs/tmpl.js',
        'src/js/libs/iscroll-probe.js',
        'src/js/libs/jweixin-1.0.0.js',
        'src/js/libs/LocalResizeIMG.js',
        'src/js/libs/mobileBUGFix.mini.js',
        'src/js/libs/swiper.jquery.min.js',
        'src/js/libs/moment.min.js',
        'src/js/libs/echarts.common.min.js',
        'src/js/libs/router.index.js',
        'src/js/libs/router.income.js',
        'src/js/libs/router.userinfo.js',
        'src/js/libs/router.userinfo0628.js',
        'src/js/libs/router.checkTicket.js',
        'src/js/libs/router.financial.js',
        'src/js/libs/router.member.js'
    ],
    libs: ['src/js/libs/tmpl.js'],
    app: [
        'src/js/app/app.js',
        'src/js/app/app.constant.js',
        'src/js/app/app.tools.js',
        'config/' + (yargs.env || 'dev') + '/app.config.js',
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
        'src/js/app/echarts/app.employeDetail.js',
        'src/js/app/echarts/app.product.js',
        'src/js/app/index/app.index.js',
        'src/js/app/income/app.income.js',
        'src/js/app/operationLog/operationLog_store.js',
        'src/js/app/serviceLog/serviceLog.js',
        'src/js/app/checkTicket/app.checkTicket.js',
        'src/js/app/financial/app.financial.js',
        'src/js/app/member/app.member.js'
    ]
};
var cssFiles = {
    weiui: ['src/css/weui.min.css', 'src/css/example.css', 'src/css/swiper.css'],
    app: ['src/less/app.less']
};
var assetFiles = ['src/fonts/**', 'src/images/**'];

gulp.task('html', function() {
    gulp.src(htmlFiles, option)
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file'
            })
        )
        .pipe(gulp.dest(dist.root));
});

gulp.task('js', function() {
    gulp.src(jsFiles.weiui).pipe(gulp.dest(dist.js));
    gulp.src(jsFiles.libs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(dist.js));
    gulp.src(jsFiles.app)
        .pipe(gulpIf(!yargs.env || yargs.env == 'test', replace('3c1210a8346d103698ba8ce2129c637b', '5a6f9c439b18d2a39b9e0b2a639a34a0')))
        .pipe(concat('app.js'))
        .pipe(
            gulpIf(
                _minify,
                uglify({
                    mangle: false,
                    compress: true
                })
            )
        )
        .on('error', function(e) {
            console.error(e.message);
            this.emit('end');
        })
        .pipe(gulp.dest(dist.js));
});
gulp.task('css', function() {
    gulp.src(cssFiles.app)
        .pipe(
            less().on('error', function(e) {
                console.error(e.message);
                this.emit('end');
            })
        )
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(reload({ stream: true }));
    gulp.src(cssFiles.weiui)
        .pipe(gulp.dest(dist.css))
        .pipe(reload({ stream: true }));
});
gulp.task('asset', function() {
    gulp.src(assetFiles, option).pipe(gulp.dest(dist.root));
    gulp.src('favicon.ico').pipe(gulp.dest(dist.root));
});

gulp.task('build', ['html', 'js', 'css', 'asset']);

gulp.task('js-watch', ['js'], reload);
gulp.task('html-watch', ['html'], reload);

gulp.task('watch', function() {
    // html
    gulp.watch(htmlFiles, ['html-watch']);
    // js
    gulp.watch(jsFiles.weiui.concat(jsFiles.libs).concat(jsFiles.app), ['js-watch']);
    // css
    gulp.watch(cssFiles.weiui.concat(['src/less/*.less']), ['css']);
});

gulp.task('server', ['build', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: './dist',
            middleware: [
                proxy('/api', {
                    target: yargs.a ? yargs.a : 'http://assistant.mei1.info',
                    changeOrigin: true
                })
            ]
        },
        ui: false,
        port: '5000',
        startPath: '/main.html#/index',
        ghostMode: false,
        socket: {
            domain: 'localhost:5000',
            path: ''
        }
    });
});

gulp.task('clean', function() {
    return gulp
        .src('dist/*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('rev-append', function() {
    gulp.src('dist/**/*.html', {
        base: 'dist'
    })
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
