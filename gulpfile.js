var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('compile-sass', function() {
    return gulp.src('wagtailclearstream/static_src/wagtailclearstream/scss/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules'],
        }))
        .pipe(gulp.dest('wagtailclearstream/static/wagtailclearstream/css'))
})

gulp.task('default', ['compile-sass'])
