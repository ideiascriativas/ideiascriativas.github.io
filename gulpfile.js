var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

var scssFiles = "./sass/*.scss";
var cssDest = "./css";

var sassDevOptions = {
    outputStyle: 'expanded'
};

var sassProdOptions = {
    outputStyle: 'compressed'
};

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('serve', ['sassprod'], function () {
   
    browserSync.init({
        server: './'
    })
    gulp.watch(scssFiles, ['sassprod']);
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("pages/*.html", ['bs-reload']);
    gulp.watch("js/*.js", ['bs-reload']);
});

gulp.task('sassdev', function () {
    return gulp.src(scssFiles)
        .pipe(sass(sassDevOptions).on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('sassprod', ['bs-reload'], function () {
    return gulp.src(scssFiles)
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
    gulp.watch(scssFiles, ['sassprod']);
});

gulp.task('default', ['serve']);