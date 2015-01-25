var gulp = require('gulp');
var $ = require("gulp-load-plugins")();
var fs = require("fs");

var https = require('https');
var pem = require('pem');
var express = require('express');

pem.createCertificate({days: 1, selfSigned: true}, function(err, keys) {

    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(__dirname + '/dist'));
    //app.listen(4000);

    https
        .createServer({key: keys.serviceKey, cert: keys.certificate}, app)
        .listen(4009);
});

// start express static file server
// start livereload server
var livereload = require('gulp-livereload');

function dest() {
	return gulp.dest('./dist/');
}

console.log("Live-reload server started at http://localhost:4009");

gulp.task('html', function() {
  return gulp.src('src/index.html')
      .pipe(dest())
      .pipe(livereload());
});

gulp.task('vendor', function() {
    return gulp.src('vendor/**/*.js')
        .pipe($.concat('vendor.js'))
        .pipe(dest())
        .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src('src/js/index.js')
        .pipe($.browserify())
        .on('prebundle', function(bundle) {
            // React Dev Tools tab won't appear unless we expose the react bundle
            bundle.require('react');
        })
        .pipe($.concat('bundle.js'))
        .pipe(dest())
        .pipe(livereload());
});

gulp.task('style', function() {
    gulp.src('./src/css/**')
        .pipe($.concat('style.css'))
        .pipe(dest())
        .pipe(livereload());
});

gulp.task('build', ['vendor','style','scripts','html']);

gulp.task('default', ['build'], function(){

    gulp.watch('vendor/**/*.js', ['vendor']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/css/**/*.css', ['style']);
    gulp.watch('src/*.html', ['html']);

    livereload.listen();
});
