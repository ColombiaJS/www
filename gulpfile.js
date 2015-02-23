var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	harp = require('harp'),
	connect = require('gulp-connect'),
	path = require('path'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var paths = {
		bower: '_harp/_components/'
	}

gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false
    });

    gulp.watch(["public/**/*.sass"], function () {
      reload("main.css", {stream: true});
    });

    gulp.watch(["public/**/*.ejs", "public/**/*.html"], function () {
      reload();
    });

    gulp.watch(["public/**/*.js"], function () {
      reload();
    });
  })
});

/**
 * Une todos los scripts base en uno
 */
gulp.task('dist-js', function(){
	return gulp.src([
			paths.bower + 'jquery/dist/jquery.js',
			paths.bower + 'slick-carousel/slick/slick.js',
			paths.bower + 'handlebars/handlebars.min.js',
			paths.bower + 'prism/prism.js',
			paths.bower + 'moment/min/moment-with-locales.min.js'
		])
		.pipe( concat('bundle.js') )
		.pipe( uglify() )
		.pipe( gulp.dest('_harp/dist/js') )
})

gulp.task('connect', function() {
  connect.server({
  	root: 'public',
  	port: 9000
  });
});

gulp.task('build', function( cb ) {
	harp.compile(
		path.resolve('_harp'), 
		path.resolve('public'), 
		function( err ){
			if( err ){
				console.log( err )
			}
			cb()
		})
});

gulp.task('default', ['build','connect']);