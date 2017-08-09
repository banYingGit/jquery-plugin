/**
 * Created by banYing on 2017/7/19 0019.
 */

var gulp = require('gulp'),

    uglify = require('gulp-uglify'),

    rename = require('gulp-rename'),

    fileSrc = 'plugin/jquery.countDown.js',

    fileName = 'jquery.countDown';

gulp.task('compress', function () {

    gulp.src(fileSrc).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(fileName))


});
gulp.task('auto', function () {

    gulp.watch(fileSrc, ['compress']);

})
gulp.task('default', ['compress', 'auto'])