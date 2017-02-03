/*
  Copy FONTS files to dist folder (dev + prod)
*/

var gulp = require('gulp');

gulp.task('fonts-copy', function() {
	return gulp.src(process.env.SRC + 'fonts/**/*').pipe(
			gulp.dest(process.env.DIST + 'fonts'))
});
