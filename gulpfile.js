var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat'),
    gls = require('gulp-live-server'),
    watch = require('gulp-watch');

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./app/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {},
        packageCache: {},
        fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);

    return watcher
        .on('update', function() { // When any files update
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle() // Create new bundle that uses the cache for high performance
                .pipe(source('app.js'))
                // This is where you add uglifying etc.
                .pipe(gulp.dest('./public/javascripts'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/javascripts'));
});


gulp.task('express', function() {
    var server = gls.new('./server/bin/www');
    server.start();
});


gulp.task('build', ['browserify']);
gulp.task('default', ['build', 'express', 'watch']);

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['default']);
});
