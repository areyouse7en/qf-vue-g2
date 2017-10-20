const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename('vue-g2.min.js'))
    .pipe(gulp.dest('dist'))
})