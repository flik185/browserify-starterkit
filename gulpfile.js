/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file
*/

// var gulp = require('./gulp')([
//     'browserify',
//     'compass',
//     'images',
//     'open',
//     'watch',
//     'serve'
// ]);
//var tasks = requireDir('./gulp/tasks');


var gulp = require('gulp');                     // npm module
var runSequence = require( 'run-sequence' );    // npm module
var requireDir = require('require-dir');        // npm module


// Require all tasks inside gulp/tasks folder.
// gulp/tasks/PARENT_TASK_NAME/CHILD_TASK_NAME.js
requireDir( './gulp/tasks', { recurse: true } );


// Starting points (static-dev and static-prod)
//'scripts-copy', --> now using 'bundlify' task
gulp.task('static-dev', function(){
  runSequence(
    'set-env-static',
    'clean',
    [
      'html',
      'sass',
      'images-copy',
      'fonts-copy'
    ],
    'watchify',
    'serve'
  );
});


gulp.task('static-prod', function(){
  runSequence(
    'set-env-static',
    'clean',
    [
      'html',
      'sass',
      'image-min',
      'fonts-copy'
    ],
    'browserify',
    'serve'
  );
});
