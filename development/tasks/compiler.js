///// Gulp compiler module
//  Compiler config
//  - TODO: Make the compiler work
//  - TODO: ADD libsass as dependecie

var gulp = require('gulp'),
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer')
  runSequence  = require('run-sequence').use(gulp),
  config       = require('.././config.json');

  // node sass (libsass , compile time 2.1ms)
gulp.task('libsass', function () {
  var path = config.development.sass;
  var destination = config.development.css;
  gulp.src(path)
  .pipe(sass({
    errLogToConsole: true
  }))
  .on('error', notify.onError(function (error) {
    return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
   }))
  .pipe(sourcemaps.write(config.development.css))
  .pipe(gulp.dest(destination))

  gulp.src(config.styleguide.scss)
  .pipe(sass({
    errLogToConsole: true
  }))
  .on('error', notify.onError(function (error) {
    return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
   }))
  .pipe(sourcemaps.write(config.styleguide.css))
  .pipe(gulp.dest(config.styleguide.css))
});
