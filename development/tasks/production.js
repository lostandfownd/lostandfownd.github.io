///// Gulp production file
//  Production config
//  - the production deployement code
// - WIP: TODO: DRY the code and make it functional
//        TODO: IMPROVE THE PRODUCTION TASK

var gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp),
  config      = require('.././config.json');

  // html copy files
 gulp.task('html', function () {
   return gulp.src(dev.html)
     .pipe(gulp.dest(prod.prod))
     .pipe($.filesize())
 });
 //bower script helper
  gulp.task('bowerJs', function () {
    gulp.src(bower.vendorJs)
    .pipe(gulp.dest(prod.vendorJs))
  });
  // js vendor copy files
  gulp.task('vendor-copy', function () {
    gulp.src(dev.vendorJs)
      .pipe(gulp.dest(prod.vendorJs))
  });
  // font copy
  gulp.task('fonts', function () {
    gulp.src(dev.fonts)
      .pipe(gulp.dest(prod.fonts))
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
