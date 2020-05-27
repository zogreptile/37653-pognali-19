"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var sassGlob = require('gulp-sass-glob');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("script", function () {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/js/**/*.js", gulp.series("script", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "script",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
