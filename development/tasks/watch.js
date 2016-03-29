///// Gulp watch module
// watch config
// TODO: Expand the watch task

var gulp = require('gulp'),
  config      = require('.././config.json'),
  compiler    = require('./compiler.js');
  optimize    = require('./optimize.js');


// Only need the scss to be watched
gulp.task('watch', function () {
  var sassPath = config.development.sass;
  var imagePath = config.development.images;

  var _initSass = function(path) {
    //  watch .scss files
    var sassWatcher = gulp.watch(path, ['libsass']);
    sassWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  };

  var _initImageOtimize = function(path) {
    //  watch images
    var imageWatcher = gulp.watch(path, ['imagemin']);
    imageWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  };



  // INITIALIZE: Sass compiler
  _initSass(sassPath);

  // INITIALIZE: Image Optimizer
  _initImageOtimize(imagePath);
});
