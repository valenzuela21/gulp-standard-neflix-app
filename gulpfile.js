const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

function css() {
    return gulp
        .src('scss/app.scss')
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'})) // nested, compact, expanded, compressed
        .pipe(cleanCss())
        .pipe(gulp.dest('public/css'))
}

function js() {
    return gulp
        .src('js/scripts.js')
        .pipe(concat('bundle.min.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('public/js'))
}


function image(){
    return gulp
        .src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/image'))
}


function watchArchivos() {
    gulp.watch('img/*.js', image);
    gulp.watch('js/*.js', js);
    gulp.watch('scss/*.scss', css);
    gulp.watch('index.html');
}

// tareas
gulp.task('img', image);
gulp.task('css', css);
gulp.task('js', js);
gulp.task('watch', gulp.parallel(watchArchivos));