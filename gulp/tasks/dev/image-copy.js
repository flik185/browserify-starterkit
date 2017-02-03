/*
  Copy IMAGE files to dist folder (dev)
*/

var gulp = require('gulp');

gulp.task('images-copy', function() {
	return gulp.src(process.env.SRC + 'images/**/*').pipe(
			gulp.dest(process.env.DIST + 'images'))
});
