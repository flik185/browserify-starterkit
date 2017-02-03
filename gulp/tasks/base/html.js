/*
  Builds HTML pages from htmlParts
*/

var gulp = require('gulp'),
    fileinclude = require('gulp-file-include');

gulp.task('html', function() {
	gulp.src([ process.env.SRC + 'templates/**/*.html' ])
    .pipe(fileinclude({
		    prefix : '@@',
		      basepath : process.env.SRC + 'htmlParts'
	  }))
    .pipe(gulp.dest(process.env.DIST));
});
