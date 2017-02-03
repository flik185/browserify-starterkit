/*
  Optimize images
*/

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');

gulp.task('image-min', function() {
	return gulp.src(process.env.SRC + 'images/**').pipe(cache(imagemin({
		progressive : true,
		svgoPlugins : [ {
			removeViewBox : false
		} ]
	}))).pipe(gulp.dest(process.env.DIST + 'images'));
});
