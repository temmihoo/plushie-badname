'use strict';

let gulp = require('gulp');
let jshint = require('gulp-jshint');
let mocha = require('gulp-mocha');


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

gulp.task('validateEvents', function(){
    return gulp.src('unit_test_events.js', {read: false})
        .pipe(mocha({reporter: 'spec', bail: true, timeout: 10000}))
        .on('error', console.log)
});

gulp.task('watch', function() {
    gulp.watch(sources.js, ['jshint']);
    //gulp.watch('**/*.json', ['validateEvents'])
});
