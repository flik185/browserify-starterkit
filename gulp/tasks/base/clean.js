/*
  Clean DIST directory
*/

var gulp = require('gulp'),
    del = require('del');

/* clean build folder */
gulp.task('clean', function() {
	return del(process.env.DIST + '**/*')
});
