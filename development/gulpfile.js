'use strict';
///// Load plugins and gulp
//  * Light Gulp build
//  * alpha version
//  * this would be used to create fast and small projects
////////////////////////////////////////////////////////////
  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/,
        lazy: true,
        camelize: true
      }),
      config      = require('./config.json'),
      webserver   = require('gulp-webserver'),
      bulkSass    = require('gulp-sass-glob-import'),
      runSequence = require('run-sequence'),
      pngquant    = require('imagemin-pngquant'),
      optipng     = require('imagemin-optipng'),
      notify      = require("gulp-notify"),
      imageop     = require('gulp-image-optimization');

// Error handler
var errorHandler = function(err) {
  notifier.notify({ message: 'Error: ' + err.message });
  gutil.log(gutil.colors.red('Error'), err.message);
};

// Destinations and paths


//// Webserver
  gulp.task('webserver', function() {
    gulp.src(config.development.dev)
      .pipe(webserver({
        port:'9090',
        livereload: true,
        open: true
      }));
    console.log('Server Online !');
  });

///// Optimization and compilation tasks
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

  // image optimization
  gulp.task('imagemin', function () {
      return gulp.src(dev.images)
          .pipe($.imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()]
          }))
          .pipe($.filesize())
          .pipe(gulp.dest(prod.images));
  });
  // html minification (offline)
  gulp.task('htmloptimize', function () {
      return gulp.src(dev.html)
        .pipe($.htmlmin({
          collapseWhitespace: true
        }))
        .pipe(gulp.dest(dist.dist))
  });


///// Production tasks
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

///// Watch tasks
// Only need the scss to be watched
  gulp.task('watch', function () {
      //  watch .scss files
      var sassWatcher = gulp.watch(dev.sass, ['libsass']);
          sassWatcher.on('change', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
          });
  });

///// General tasks
  // Development  (development run brute tasks)
  gulp.task('development', ['watch', 'webserver', 'libsass']);

  // Production (optimize the files make them production ready)
  gulp.task('production', ['imagemin', 'prod-cluster']);
