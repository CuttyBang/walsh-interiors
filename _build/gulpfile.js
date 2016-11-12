var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var neat = require('node-neat').includePaths;
var bourbon = require('node-bourbon');
var gulpsync = require('gulp-sync')(gulp);
var glob = require('glob');

var dirs = {
  theme:'../',
  assets:'assets/',
  css:'css/',
  js:'js/',
  scss:'./scss/'
};


gulp.task('jshint', function() {
  return gulp.src(dirs.js + 'main.js')
  .pipe(jshint({
    asi: true
  }))
  .pipe(jshint.reporter('default'));
});


gulp.task('sass', function(){
  return gulp.src(dirs.scss + '*.scss')
  .pipe(sass({
    includePaths: ['sass'].concat(neat)
  }))
  .pipe(gulp.dest(dirs.theme + dirs.assets +  dirs.css))
});

//watch
gulp.task('watch', function(){
  gulp.watch('./' +  dirs.js + '*.js', ['jshint','scripts']);
  gulp.watch(dirs.scss + 'main.scss', gulpsync.sync(['sass','styles']));
});

gulp.task('scripts', function() {
  return gulp.src(dirs.js + 'main.js')
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest(dirs.theme + dirs.assets +  dirs.js));
});


gulp.task('styles', function() {
  return gulp.src(dirs.theme + dirs.assets +  dirs.css + 'main.css')
    .pipe(cssnano())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(dirs.theme + dirs.assets +  dirs.css));
});

gulp.task('images', function() {
  return gulp.src(dirs.theme + dirs.assets +  dirs.img + '*')
    .pipe(imagemin())
    .pipe(gulp.dest(dirs.theme + dirs.assets +  dirs.img));
});


gulp.task('default', ['watch']);

gulp.task('build', gulpsync.sync(['sass', 'styles', 'jshint', 'scripts', 'images']));
