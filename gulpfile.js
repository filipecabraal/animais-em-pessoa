var gulp      = require('gulp');
    uglify    = require('gulp-uglify'),
    less      = require('gulp-less'),
    concat    = require('gulp-concat'),
    htmlmin   = require('gulp-htmlmin'),
    cleanCSS  = require('gulp-clean-css'),
    svgstore  = require('gulp-svgstore'),
    svgmin    = require('gulp-svgmin'),
    myip      = require('quick-local-ip'),
    connect   = require('gulp-connect'),
    clean     = require('gulp-clean'),
    path      = require('path'),
    imagemin  = require('gulp-imagemin');

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

// LIMPANDO SVG
gulp.task('clean-svg', function () {
  return gulp.src('assets/images/svg/svg.svg', {read: false})
    .pipe(clean());
});

// GERANDO SVG
gulp.task('svg', ['clean-svg'], function () {
    return gulp.src('assets/images/svg/**/*.svg')
    .pipe(svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest('dist/images/svg'))
});

// OTIMIZANDO IMAGENS
gulp.task('images', function() {
    return gulp.src([
        'assets/images/**/*.gif',
        'assets/images/**/*.jpg',
        'assets/images/**/*.png',
        'assets/images/**/*.svg'
    ])
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('dist/images/'))
});

// MINIFICAR HTML
gulp.task('html', function() {
    gulp.src('assets/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true,minifyJS: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// OTIMIZAR OS SCRIPTS
var global = [
    'assets/js/plugins/jquery.js',
    'assets/js/plugins/fancybox.js',
    'assets/js/plugins/maskedinput.js',
    'assets/js/plugins/modernizr.js',
    'assets/js/plugins/owl.carousel.js',
    'assets/js/plugins/placeholder.js',
    'assets/js/plugins/validate.js',
    'assets/js/modules/maps.js',
    'assets/js/modules/page.js'
];

gulp.task('scripts', function() {
    gulp.src(global)
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// MINIFICAR CSS
gulp.task('less', function() {
    gulp.src('assets/less/main.less')
    .pipe(less())
    .on('error', swallowError)
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// SERVIDOR
gulp.task('connect', function() {
    connect.server({
        host: myip.getLocalIP4(),
        livereload: true
    });
});

// WATCH LESS, SCRIPTS E LIVERELOAD
gulp.task('watch', function() {
    gulp.watch('assets/html/*.html', ['html']);    
    gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('default', ['html', 'less', 'scripts', 'images', 'connect', 'watch']);