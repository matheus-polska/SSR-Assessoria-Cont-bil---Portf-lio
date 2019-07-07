var gulp = require('gulp');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var htmlReplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');



gulp.task('server', gulp.series(server));
gulp.task('build', gulp.series(clear, copy, gulp.parallel(buildJs, buildHtml, buildCss, buildImg)));


function copy(done) {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
    done();
}

function clear(done) {
    return gulp.src('dist')
        .pipe(clean());
    done();
}

function buildJs(done) {
    return gulp.src(['dist/js/app.js', 'dist/libs/jquery/jquery.min.js', 'dist/js/intersectionObservers.js', 'dist/js/mail.js', 'dist/libs/owl/owl.carousel.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
    done();
}

function buildCss(done) {
    return gulp.src('dist/**/**.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('dist/css'))
    done();
}

function buildHtml(done) {
    return gulp.src('dist/*.html')
        .pipe(htmlReplace({
            js: 'js/all.js',
            css: 'css/main.min.css'
        }))
        .pipe(gulp.dest('dist'))
    done();
}

function sassConverter(done) {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
    done()
}


function buildImg(done) {
    return gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    done()
}

function server(done) {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
        port: 8080
    })
    gulp.watch('src/scss/**/*.scss', sassConverter);
    gulp.watch('src/**/*').on('change', browserSync.reload);
    done()
}
