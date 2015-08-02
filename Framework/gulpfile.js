var gulp = require('gulp');
var concat = require('gulp-concat');
var ifElse = require('gulp-if-else');
var gulpIf = require('gulp-if');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var stripLine = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');
var less = require('gulp-less');

var isDebug = true;

gulp.task('buildMenuTemplateCache', function() {
    return gulp.src(['./ext-modules/psMenu/**/*.html'])
        .pipe(templateCache({
            root: 'ext-modules/psMenu/',
            module: 'psMenu'
        }))
        .pipe(gulp.dest('./ext-modules/psMenu/'));
});

gulp.task('buildDashboardTemplateCache', function () {
    return gulp.src(['./ext-modules/psDashboard/**/*.html'])
        .pipe(templateCache({
            root: 'ext-modules/psDashboard/',
            module: 'psDashboard'
        }))
        .pipe(gulp.dest('./ext-modules/psDashboard/'));
});

gulp.task('buildFrameworkTemplateCache', function () {
    return gulp.src(['./ext-modules/psFramework/**/*.html'])
        .pipe(templateCache({
            root: 'ext-modules/psFramework/',
            module: 'psFramework'
        }))
        .pipe(gulp.dest('./ext-modules/psFramework/'));
});

gulp.task('buildModulesJavaScript', function() {
    return gulp.src(['./ext-modules/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('psFramework.js'))
        .pipe(stripLine(['use strict']))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildModulesCSS', function () {
    return gulp.src(['./ext-modules/**/*.css'])
        .pipe(concat('psFramework.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildAppTemplateCache', function () {
    return gulp.src(['./app/**/*.html'])
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('buildAppJavaScript', function () {
    var target = gulp.src('./index.html');

    var appStream = gulp.src(['./app/**/*.js'])
        .pipe(angularFilesort())
        .pipe(gulpIf(!isDebug, concat('app.js')))
        .pipe(stripLine(['use strict']))
        .pipe(gulp.dest('./dist/'));

    return target.pipe(inject(appStream))
      .pipe(gulp.dest('./'));
});

gulp.task('LessCompileApp', function () {
    return gulp.src(['./app/**/*.less'])
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildAppResources', ['LessCompileApp', 'buildAppJavaScript', 'buildAppTemplateCache']);

gulp.task('watch', function() {
    gulp.watch(['./app/**/*', '!app/**/templates.js'], ['buildAppResources']);
});

gulp.task('default', ['buildAppResources', 'watch']);

gulp.task('publish', function () {
    isDebug = false;

});