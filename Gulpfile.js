'use strict';

let gulp = require('gulp');
let jshint = require('gulp-jshint');


let sources = {
  js: '**/*.js'
}

gulp.task('default', ['watch']);

// gulp.task('scripts', function() {
//     gulp.src(sources.js)
//         .pipe(gulp.dest('dist'));
// });

gulp.task ('jshint', function() {
    return gulp.src(sources.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch(sources.js, ['jshint']);
});
