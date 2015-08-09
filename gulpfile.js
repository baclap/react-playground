'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const exit = require('gulp-exit');

// this not only starts the app but will also monitor for file changes and
// restart the app when changes are detected
gulp.task('nodemon', function() {
  nodemon({
    script: 'app.js',
    env: {PORT: 4000},
    nodeArgs: ['--harmony']
  }).on('restart');
});

gulp.task('watch', function() {
  // gulp's built in watch function
  gulp.watch(
    ['app.js', '*/*.{html,js}'], //blurbs of files to watch
    ['mocha'] //tasks to run when the above files change
  );
});

gulp.task('mocha', function() {
  process.env.PORT = 4001;
  // return is important here... http://stackoverflow.com/a/21700789
  return gulp.src(['test/*.js'])
    .pipe(mocha({reporter: 'nyan'})); // nyan reporter is dope lol
})

gulp.task('test-once', function() {
  gulp.tasks.mocha.fn().pipe(exit());
});

// running gulp (or in our ES6 case, node --harmony `which gulp`) will run the
// task in this array
gulp.task('default', ['nodemon', 'mocha', 'watch']);
