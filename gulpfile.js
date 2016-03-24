var gulp = require('gulp'),
   browserify = require("gulp-browserify"),
   notify = require("gulp-notify"),
   less = require("gulp-less"),
   jshint = require("gulp-jshint");


var paths = {
    watch: ['./client/**/*.js', './client/styles/*.less', './client/views/*.html', '!./client/dist/js/*.js'],
    browserify: ['./client/*.js'],
    lint: ['./client/**/*.js', '!./client/dist/js/*.js'],
    styles: ['./client/styles/*.less'],
    dist: {
        css: './css',
        js: './js',
    },
};

function notifyBrowserifyError() {
    gulp.src("gulpfile.js").pipe(notify("Browserify failed!"));
    this.emit('end');
}

function notifyLessError() {
    gulp.src("gulpfile.js").pipe(notify("Less failed!"));
    this.emit('end');
}

function notifyLintError() {
    gulp.src("gulpfile.js").pipe(notify("Lint failed!"));
    this.emit('end');
}


gulp.task("build", function () {
    gulp.src(paths.browserify)
        .pipe(browserify({
        }))
        .on('error', notifyBrowserifyError)
        .pipe(gulp.dest(paths.dist.js));

    gulp.src(paths.styles)
        .pipe(less())
        .on('error', notifyLessError)
        .pipe(gulp.dest(paths.dist.css));

    gulp.src(paths.lint)
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail")
        .on('error', notifyLintError));

    console.log("Success!");
});

gulp.task("less", function () {
    gulp.src(paths.styles)
        .pipe(less())
        .on('error', function(err) { console.log(err); })
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task("bundle", function () {
    gulp.src(paths.browserify)
        .pipe(browserify({
        }))
        .on('error', function (err) { console.log(err); })
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task("lint", function () {
    gulp.src(paths.lint)
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail")
        .on('error', function(err) { console.log(err); }));
});

gulp.task("watch", function () {
    gulp.watch(paths.watch, ['build']);
});
