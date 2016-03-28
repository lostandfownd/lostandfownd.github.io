///// Gulp server file
//  Server config
//  - can be upgraded to much more than this

var gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp),
  webserver   = require('gulp-webserver'),
  config      = require('.././config.json');

///// Project web server
  gulp.task('project-server', function() {
    // server path
    var path = config.development.dev;

    return gulp.src(path)
      .pipe(webserver({
        port:'9090',
        livereload: true,
        directoryListing: false,
        open: true
      }));
    console.log('Project server Online !');
  });

//// styleguide web server
//  - works but the port is used and thus error
  gulp.task('styleguide-server', function() {
    // server path
    var path = config.styleguide.styleguide;

    return gulp.src(path)
      .pipe(webserver({
        port:'9080',
        livereload: true,
        directoryListing: false,
        open: true
      }));
    console.log('Styleguide server Online !');
  });

// Run both servers in sequence
gulp.task('webserver', function() {
  runSequence(['project-server', 'styleguide-server']);
});
