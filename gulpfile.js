'use strict';

var gulp = require('gulp');

gulp.task('clean', function () {
    var del = require('del');
    del.sync([
        './dist'
    ]);
});

gulp.task('style', function () {
    var sass = require('gulp-sass'),
        del = require('del'),
        sourcemaps = require('gulp-sourcemaps'),
        concat = require('gulp-concat');
    
    del.sync(['./css/style.css']);
    return gulp.src(['./sass/*.scss'])
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./css/'));
});

gulp.task('script', function () {
    var concat = require('gulp-concat');
    return gulp.src([
            './bower_components/jQuery/dist/jquery.js',
            './scripts/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./scripts/'));
});

gulp.task('default', ['clean', 'style'], function () {

});
