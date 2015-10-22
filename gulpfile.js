'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const less = require('gulp-less');

// this not only starts the app but will also monitor for file changes and
// restart the app when changes are detected
gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    nodeArgs: ['--harmony']
  }).on('restart');
});

// run mocha test when changes detected in files
gulp.task('watch', function() {
  //concat css
  gulp.watch(
    ['assets/less/**/*.less'], ['bundle-css']
  )
});

gulp.task('bundle-css', function(){
  return gulp.src(['assets/less/**/*.less', '!assets/less/mixins/*.less'])
    .pipe(less({
      paths: ['assets/less/mixins']
    }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename('bundle.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'));
});

// one-off browserify task which is handy when debugging
// node --harmony `which gulp` browserify
gulp.task('browserify', function() {
  const b = getBrowserifyInstance();
  b.transform(babelify);
  return bundleBrowserify(b);
})

// update bundle.js when changes detected in client-side js/jsx
gulp.task('watchify', function() {
  // create watchify instance wrapping our browserify instance
  // re-run compile whenever watchify emits an update event
  const b = getBrowserifyInstance();
  const w = watchify(b);

  w.transform(babelify);
  w.on('update', function() {
    console.log('updating bundle');
    bundleBrowserify(w);
  });
  bundleBrowserify(w);
});

const getBrowserifyInstance = function() {
  // create browserify instance
  const b = browserify('assets/js/app.jsx', {
    debug: true,
    extensions: ['.jsx'],

    // watchify args
    cache: {},
    packageCache: {}
  });

  return b;
}

// receives a browserify instance and bundles it
const bundleBrowserify = function(b) {
  return b
    .bundle(function(err){
      if(err){
        console.log(err.message);
      } else {
        console.log('bundle done');
      }
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
};

// running gulp (or in our ES6 case, node --harmony `which gulp`) will run the
// task in this array
gulp.task('default', ['nodemon', 'bundle-css', 'watch', 'watchify']);
