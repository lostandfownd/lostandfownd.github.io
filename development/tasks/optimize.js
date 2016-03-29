///// Gulp optimize file
//  Optimization config
//  - holds the optimization tasks
//  NOTE: These tasks will be tied together with production

var gulp = require('gulp'),
  imagemin    = require('gulp-imagemin'),
  pngquant    = require('imagemin-pngquant'),
  optipng     = require('imagemin-optipng'),
  imageop     = require('gulp-image-optimization'),
  htmlmin     = require('gulp-htmlmin'),
  filesize    = require('gulp-filesize');
  runSequence = require('run-sequence').use(gulp),
  config      = require('.././config.json');


// image optimization
gulp.task('imagemin', function () {
  var path = config.development.images;
  var destination = config.production.images;

  return gulp.src(path)
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(filesize())
      .pipe(gulp.dest(destination));
});
// html minification
// - for the moment the dest file is in development
gulp.task('htmloptimize', function () {
  var path = config.development.html;
  var destination = config.production.prod;

  return gulp.src(path)
    .pipe(htmlmin({
      collapseWhitespace: false
    }))
    .pipe(gulp.dest(destination))
});

// Run both servers in sequence
gulp.task('optimize', function() {
  runSequence(['imagemin', 'htmloptimize']);
});
