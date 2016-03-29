///// Gulp watch module
// watch config
// TODO: Expand the watch task

var gulp = require('gulp'),
  config      = require('.././config.json'),
  compiler    = require('./compiler.js');


// Only need the scss to be watched
gulp.task('watch', function () {
  //  watch .scss files
  var sassPath = config.development.sass;
  var sassWatcher = gulp.watch(sassPath, ['libsass']);
  sassWatcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
