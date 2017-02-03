/*
  Set environment vars (STATIC)
*/

var gulp = require('gulp'),
    env = require('gulp-env');

gulp.task('set-env-static', function() {
	env({
		vars : {
			SRC : 'static/src/',
			DIST : 'static/dist/'
		}
	});
});
