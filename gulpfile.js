'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const exit = require('gulp-exit');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');

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
  // gulp's built in watch function
  gulp.watch(
    ['**/*.{html,js,jsx}', '!node_modules/**'], // blurbs of files to watch
    ['mocha'] // tasks to run when the above files change
  );

  //concat css
  gulp.watch(
    ['app/src/css/**/*.css'], ['bundle-css']
  )
});

gulp.task('bundle-css', function(){
  return gulp.src('app/src/css/**/*.css')
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(rename('bundle.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('app/assets/css'));
});

// run mocha test in the test directory
gulp.task('mocha', function() {
  //process.env.PORT = 4001;
  // return is important here... http://stackoverflow.com/a/21700789
  return gulp.src(['app/test/*.js'])
    .pipe(mocha({reporter: 'nyan'})); // nyan reporter is dope lol
});

// gulp task which will run mocha test one time then exit
// used by our `npm test` script in package.json
gulp.task('test-once', function() {
  gulp.tasks.mocha.fn().pipe(exit());
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
  const b = browserify('app/src/js/app.jsx', {
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
      }else{
        console.log('bundle done');
      }
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('app/assets/js'));
};

// running gulp (or in our ES6 case, node --harmony `which gulp`) will run the
// task in this array
gulp.task('default', ['nodemon', 'bundle-css', 'mocha', 'watch', 'watchify']);