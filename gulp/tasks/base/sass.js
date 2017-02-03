/*
  Compile sass files
*/

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
	  sass = require('gulp-sass'),
    gutil = require('gulp-util');


gulp.task('sass', function() {
	gulp.src(process.env.SRC + 'scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest(process.env.DIST + 'css'))
	.pipe(browserSync.stream()).on('error', gutil.log)// inject css changes (not full page reload)
});
