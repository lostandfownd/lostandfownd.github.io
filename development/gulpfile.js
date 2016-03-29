'use strict';
/////
//  * SUMACH Gulp Build
//  ** - spice my build up
//  * Author: Alex Dragos
//  * version: 0.1
//  TODO: UPGRADE
//  TODO: EXPAND FUNCTIONALITY
//  NOTE: This is derived from the light gulp build
///////////////////////////////////////////////////////
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/,
    lazy: true,
    camelize: true
  }),
  // gulp secondary plugins
  bulkSass    = require('gulp-sass-glob-import'),
  runSequence = require('run-sequence'),
  notify      = require("gulp-notify"),
  requireDir  = require('require-dir'),
  // project utils
  config      = require('./config.json'),
  tasks      = requireDir('tasks');

// Error handler
var errorHandler = function(err) {
  notifier.notify({ message: 'Error: ' + err.message });
  gutil.log(gutil.colors.red('Error'), err.message);
};


///// General tasks
// Development  (development run brute tasks)
gulp.task('development', ['watch', 'webserver', 'libsass']);

// Production (optimize the files make them production ready)
gulp.task('production', ['imagemin', 'prod-cluster']);
