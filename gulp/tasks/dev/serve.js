/*
  Start local Server
  Listen for scss, html, js changes and reload
*/

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();

gulp.task('serve', function() {
	browserSync.init({
		server : {
			baseDir : "./" + process.env.DIST
		},
		//logLevel: 'debug', // Three options, debug, info or silent
		//logFileChanges: true,
    //reloadDelay: 10000,

		files : [process.env.DIST + "scripts/**/*.js", process.env.DIST + "**/*.html", process.env.DIST + "css/**/*.css" ]

    // proxy: "yourlocal.dev"
	});

	//gulp.watch(process.env.SRC + 'scripts/**/*.js', [ 'scripts-copy' ]); // if not using browserify
	//gulp.watch(process.env.SRC + 'scss/**/*.scss', [ 'sass' ]).on('change',browserSync.reload);
	gulp.watch(process.env.SRC + 'scss/**/*.scss', [ 'sass' ]);
  gulp.watch(process.env.SRC + "**/*.html", ['html']);
});
