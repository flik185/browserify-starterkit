/*
  Copy js files to dist folder (dev)
*/

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    merge = require('merge-stream');

gulp.task('scripts-copy', function() {
	var main = gulp.src(
			[ process.env.SRC + 'scripts/libs/*.js',
        process.env.SRC + 'scripts/main.js'
      ]).pipe(concat('main.js')).pipe(gulp.dest(process.env.DIST + 'scripts'));
  var alien = gulp.src(
			[ process.env.SRC + 'scripts/alien8/*.js']).pipe(gulp.dest(process.env.DIST + 'scripts/alien8'));

  return merge(main, alien);
});
