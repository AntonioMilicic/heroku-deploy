var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');

var SCSS_SRC = './client/static/Assets/scss/**/*.scss'; // Input
var SCSS_DEST = './client/static/Assets/css'; // Output

gulp.task('compile_scss', function () {
  gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError)) // compile into standard css
    .pipe(changed(SCSS_DEST)) // Only effect changed files
    .pipe(gulp.dest(SCSS_DEST)); // Output to Output.destination
});

// detect changes in SCSS(watching scss folder)
// needed because gulp.task is only done once, this is creating a loop
gulp.task('watch_scss', function () {
  gulp.watch(SCSS_SRC, ['compile_scss']);
});

// Run tasks
gulp.task('default', ['watch_scss']);
