///// Gulp production file
//  Production config
//  - the production deployement code
// - WIP: TODO: DRY the code and make it functional
//        TODO: IMPROVE THE PRODUCTION TASK
//        FIXME: Prod Cluster is illogical


var gulp = require('gulp'),
  filesize    = require('gulp-filesize');
  runSequence = require('run-sequence').use(gulp),
  config      = require('.././config.json');

// MOVE: HTML Files
gulp.task('html', function () {
 return gulp.src(config.development.html)
   .pipe(gulp.dest(config.production.prod))
   .pipe(filesize())
});

// MOVE: Javascript files
gulp.task('vendor-js', function () {
  gulp.src(config.development.vendorJs)
    .pipe(gulp.dest(config.production.vendorJs))
});

// font copy
gulp.task('fonts', function () {
  gulp.src(config.development.fonts)
    .pipe(gulp.dest(config.production.fonts))
});

// cluster copy
gulp.task('prod-cluster', function () {
  runSequence('html', 'imagemin', function () {
  return gulp.src(dev.vendorJs)
  .pipe(gulp.dest(prod.vendorJs))
  .on('end', function () {
    return  gulp.src(dev.fonts)
      .pipe(gulp.dest(prod.fonts))
  })
  .on('end', function () {
    return  gulp.src(dev.css)
      .pipe(gulp.dest(prod.css))
    })
  // copy any .txt files
  .on('end', function () {
    return gulp.src('./app/*.txt')
    .pipe(gulp.dest(prod.prod))
    })
  // copy any .xml files
  .on('end', function () {
    return gulp.src('./app/*.xml')
    .pipe(gulp.dest(prod.prod))
    })
  // copy any .xml files
  .on('end', function () {
    return gulp.src('./app/.htaccess')
    .pipe(gulp.dest(prod.prod))
    })
  });
});
