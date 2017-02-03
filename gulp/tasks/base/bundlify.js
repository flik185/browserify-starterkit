var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    assign = require('lodash.assign'),
    browserSync = require('browser-sync'),
    del = require('del');


var customOpts = {
    entries: ['static/src/scripts/main.js'],
    debug: true,
    //ignore: [process.env.SRC +'scripts/libs/**']
};
var opts = assign({}, watchify.args, customOpts);


/*
  For PROD
*/
gulp.task('browserify', function() {
    return browserify(opts)
      .bundle()
      .on('error', function(err)
      {
          console.log(err.message);
          browserSync.notify(err.message, 3000);
          this.emit('end');
      })
      .pipe(plumber())
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(process.env.DIST+'scripts/'));
});

/*
  For DEV
*/
gulp.task('watchify', function() {
  watchify.args.debug = true;
  var bundler = watchify(browserify(opts));

  bundler.on('update', rebundle);
  bundler.on('log', util.log.bind(util));


  function rebundle() {
    return bundler.bundle()
      .on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(process.env.DIST+'scripts/'));
  }

  return rebundle();
});
