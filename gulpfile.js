var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('compile-sass', function() {
    return gulp.src('wagtailbettereditor/static_src/wagtailbettereditor/scss/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules'],
        }))
        .pipe(gulp.dest('wagtailbettereditor/static/wagtailbettereditor/css'))
})

gulp.task('default', ['compile-sass', 'copy-fonts'])
