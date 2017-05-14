var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var vueify = require('gulp-vueify');


gulp.task('build-js', function() {
    gulp.src('./scripts/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('./'));
});

gulp.task('build-vue', function() {
    gulp.src('./components/**/*.vue')
        .pipe(vueify())
        .pipe(gulp.dest('./scripts/components/'));
});

gulp.task('watcher',['build-vue', 'build-js'], function() {
    gulp.watch('./components/**/*.vue', ['build-vue']);
    gulp.watch('./scripts/**/*.js', ['build-js']);
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./app.js').on('change', browserSync.reload);
});

gulp.task('serve',['build-vue', 'watcher'], function() {
    browserSync.init({
        server: {
            baseDir: './',
            open: true
        }
    })
});