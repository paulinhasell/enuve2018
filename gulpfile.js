var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
const notify = require("gulp-notify");

// task para o scss
gulp.task("sass", function() {
  return gulp.src(["source/sass/style.scss", "source/sass/plugins.scss"])
    .pipe(sass({ outputStyle: "compressed" })
      .on("error", sass.logError))
    .on("error", notify.onError({ title: "erro ao compilar", message: "<%= error.message %>" }))
    .pipe(gulp.dest("source/css"));
});

// task para o js
gulp.task('minify-js', function() {
  gulp.src('source/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('source/js/'));
});

//task para o html
gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

// tarefa para watch 
gulp.task("watch", function() {
  gulp.watch("source/sass/*.*", ["sass"]);
});
// tarefa para watch 
gulp.task("watchjs", function() {
  gulp.watch("source/*.js", ["minify-js"]);
});
// tarefa para watch 
gulp.task("watchhtml", function() {
  gulp.watch("source/*.php", ["html"]);
});


// chamar todas as tarefas
gulp.task("default", ["sass", "minify-js", "watch", "html", "watchjs", "watchhtml"]);