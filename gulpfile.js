const gulp = require('gulp')
const rename = require('gulp-rename')
const uglifycss = require('gulp-uglifycss')
const sourcemaps = require('gulp-sourcemaps')



gulp.task('default', ['css'])

gulp.task('css', () => {
    return gulp.src('src/style.css')
               .pipe(rename('do-slide.css'))
               .pipe(gulp.dest('dist'))
               .pipe(rename({ suffix: '.min' }))
               .pipe(sourcemaps.init())
               .pipe(uglifycss())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['css'], (done) => {
    gulp.watch('src/style.css', ['css'])
})
