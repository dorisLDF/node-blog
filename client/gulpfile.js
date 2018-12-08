var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');// html压缩
var cssmin = require('gulp-minify-css');// css压缩
var uglify = require('gulp-uglify');// js压缩
var clean = require('gulp-clean');// 清空文件夹
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var connect = require('gulp-connect');

// 清除dist
gulp.task('clean', function () {
  gulp.src('./dist/')
    .pipe(clean());
});

// html
gulp.task('html', function() {
  // 处理html
  gulp.src('./src/*/*.html')
    .pipe(htmlmin({
      removeComments: true, // 清除HTML注释
      collapseWhitespace: true, // 压缩HTML
      minifyJS: true, // 压缩页面JS
      minifyCSS: true // 压缩页面CSS
    }))
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(connect.reload())
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(gulp.dest('./dist/'));
  
  // 处理pug
  gulp.src('./src/*/*.pug')
    .pipe(pug())
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(connect.reload())
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(gulp.dest('./dist/'));
});

// css
gulp.task('css', function() {
  // 处理css
  gulp.src('./src/*/*.css')
    // css前缀
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(cssmin())
    .on('error', function (err) {
      console.log(err);
    })
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(gulp.dest('./dist/'));

  // 处理stylus
  gulp.src('./src/*/*.styl')
    .pipe(stylus({
      'compress': true,
      'include css': true
    }))
    .on('error', function (err) {
      console.log(err);
    })
    // css前缀
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .on('error', function (err) {
      console.log(err);
    })
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(gulp.dest('./dist/'));
});

// js
gulp.task('js', function() {
  // 这是指定**下面所有的js，包含index/libs/index.js
  gulp.src('./src/*/*.js')
    // ES6转ES5
    .pipe(babel({
      presets: 'env'
    }))
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(uglify())
    .on('error', function (err) {
      console.log(err);
    })
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(gulp.dest('./dist/'));
});

// 图片
gulp.task('img', function() {
  gulp.src('./src/imgs/*')
    .pipe(gulp.dest('./dist/'));
});

// 开发
gulp.task('watch', function () {
  // gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/css/*', ['css']);
  gulp.watch('./src/js/*', ['js']);
  gulp.watch('./src/img/*', ['img']); 
});

// 生产
gulp.task('default', ['css', 'js', 'img']);

