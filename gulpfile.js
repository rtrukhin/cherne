'use strict';

var gulp = require('gulp');

function startExpress() {
    var express = require('express'),
        app = express();

    app.use(express.static(__dirname));
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

    gulp.src('./index.html').pipe(open(options));

});

gulp.task('clean', function() {
    var del = require('del');
    del.sync([
        './dist'
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