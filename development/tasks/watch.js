///// Watch tasks

// TODO: Revise the watch task  

// Only need the scss to be watched
  gulp.task('watch', function () {
      //  watch .scss files
      var sassWatcher = gulp.watch(dev.sass, ['libsass']);
          sassWatcher.on('change', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
          });
  });
