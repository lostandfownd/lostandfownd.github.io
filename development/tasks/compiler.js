///// Gulp compiler file
//  Compiler config
//  - TODO: Make the compiler work
//  - TODO: ADD libsass as dependecie

var gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp),
  config      = require('.././config.json');

// node sass (libsass , compile time 2.1ms)
gulp.task('libsass', function () {

  gulp.src(dev.sass)
  .pipe(bulkSass())
  .pipe($.sass({errLogToConsole: true}))
  .on('error', notify.onError(function (error) {
    return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
  }))
  .pipe($.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
   }))
  .pipe($.sourcemaps.write('./project/css/map'))
  .pipe(gulp.dest('./project/css'))

  gulp.src(styleguide.scss)
  .pipe(bulkSass())
  .pipe($.sass({errLogToConsole: true}))
  .on('error', notify.onError(function (error) {
    return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
  }))
  .pipe($.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
   }))
  .pipe($.sourcemaps.write('./project/styleguide/css/map'))
  .pipe(gulp.dest('./project/styleguide/css'))

});
