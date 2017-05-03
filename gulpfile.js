'use strict';

var gulp = require('gulp');

function startExpress(path) {
    var express = require('express'),
        app = express();

    app.use(express.static(path ? __dirname + '/' + path : __dirname));
    app.listen(9095);
}

gulp.task('serve', ['styles'], function() {
    var livereload = require('gulp-livereload'),
        open = require('gulp-open'),
        options = {
            uri: 'http://chernets-art.info:9095'
        };

    livereload.listen({
        start: true,
        port: 35728
    });
    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch(['./styles/main.css', './scripts/*.js']).on('change', livereload.changed);

    startExpress();

    gulp.src('./index.html')
        .pipe(open(options));

});

gulp.task('serve-dist', ['clean', 'locales-dist', 'styles-dist', 'images-dist', 'html-dist', 'scripts-dist', ], function() {
    var open = require('gulp-open'),
        htmlreplace = require('gulp-html-replace'),
        options = {
            uri: 'http://chernets-art.info:9095'
        };

    gulp.src('./index.html')
        .pipe(htmlreplace({
            'css': 'css/style.css',
            'jsrjs': {
                src: [
                    ['js/main', 'js/require.js']
                ],
                tpl: '<script data-main="%s" src="%s"></script>'
            },
            'jsl20n': {
                src: 'js/l20n.js',
                tpl: '<script defer src="%s"></script>'
            },
            'livereload': ''
        }))
        .pipe(gulp.dest('dist'));

    startExpress('dist');

    gulp.src('./index.html')
        .pipe(open(options));
});

gulp.task('clean', function() {
    var del = require('del');
    del.sync([
        './dist',
        './style',
        './styles'
    ]);
});

gulp.task('styles', function() {
    var sass = require('gulp-sass'),
        concat = require('gulp-concat');
    return gulp.src(['./sass/*.scss'])
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./styles/'));
});

gulp.task('styles-dist', function() {
    var sass = require('gulp-sass'),
        concat = require('gulp-concat');
    return gulp.src(['./sass/*.scss'])
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('html-dist', function() {
    return gulp.src(['./*.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('locales-dist', function() {
    return gulp.src(['./locales/*.ftl'])
        .pipe(gulp.dest('./dist/locales'));
});

gulp.task('images-dist', function() {
    return gulp.src(['./images/*.jpg'])
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('scripts-dist', ['script-dist-copy'], function() {
    var requirejsOptimize = require('gulp-requirejs-optimize'),
        concat = require('gulp-concat');

    return gulp.src(['./scripts/*.js'])
        .pipe(requirejsOptimize())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('script-dist-copy', function() {
    return gulp.src(['./node_modules/l20n/dist/compat/web/l20n.js', './bower_components/requirejs/require.js'])
        .pipe(gulp.dest('./dist/js/'));
});