'use strict';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    jslint = require('gulp-jslint'),
    webserver = require('gulp-webserver'),
    argv = require('yargs').argv;

var paths = {
    scripts: 'www/javascripts',
    styles: 'www/stylesheets',
    sass: 'sass'
}

var files = {
    js: paths.scripts + '/**/*.js',
    css: paths.styles + '/**/*.css',
    sass: paths.sass + '/**/*.scss'
}

var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles));
});

gulp.task('sass:watch', function () {
    gulp.watch(files.sass, ['sass']);
});

gulp.task('js-lint', function () {
    return gulp.src(files.js)
        .pipe(jslint({
            devel: true,
            browser: true,
            global: [],
            predef: []
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('comp',function(){
    //babel components/es2015/date-widget.es2015.comp.js
    //       --out-file components/es5/date-widget.comp.js
    return gulp.src(['components/es2015/*.comp.js'])
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest('components/es5'));
})

gulp.task('services',function(){
    //babel components/es2015/date-widget.es2015.comp.js
    //       --out-file components/es5/date-widget.comp.js
    return gulp.src(['components/es2015/*.services.js'])
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest('components/es5'));
})

gulp.task('server', function () {
    return gulp.src('')
        .pipe(webserver({
            port: 3000,
            livereload: true,
            directoryListing: true,
            open: 'http://localhost:3000/www/index.html'
        }));
});

gulp.task('default', ['sass', 'sass:watch', 'comp','services','server'], function () {
     gulp.watch('components/es2015/*.comp.js', ['comp']);
     gulp.watch('components/es2015/*.services.js', ['services']);
});
