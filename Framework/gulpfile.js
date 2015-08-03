var gulp = require('gulp');
var concat = require('gulp-concat');
var ifElse = require('gulp-if-else');
var gulpIf = require('gulp-if');
var inject = require('gulp-inject');
var del = require('del');
var runSequence = require('run-sequence');
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
    return gulp.src(['./app/**/*.js'])
        .pipe(angularFilesort())
        .pipe(gulpIf(!isDebug, concat('app.js')))
        .pipe(stripLine(['use strict']))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('LessCompileApp', function () {
    return gulp.src(['./app/**/*.less'])
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*', '!app/**/templates.js'], ['buildAppResources']);
});

gulp.task('clean', function(cb) {
    return del(['./dist/**/*'], { force: true }, cb);
});

gulp.task('inject', function () {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src('./dist/psFramework.js', { read: false }), { name: 'framework' }))
        .pipe(inject(gulp.src(['./dist/**/*.js', '!./dist/psFramework.js'], { read: false })))
        .pipe(inject(gulp.src('./dist/**/*.css', { read: false })))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'watch']);

gulp.task('build', function () {
    runSequence(
        'clean',
        ['buildMenuTemplateCache', 'buildDashboardTemplateCache', 'buildFrameworkTemplateCache', 'buildModulesCSS', 'buildAppTemplateCache', 'LessCompileApp'],
        ['buildModulesJavaScript', 'buildAppJavaScript'],
        'inject');
});

gulp.task('publish', function () {
    isDebug = false;
    runSequence(
        'clean',
        ['buildMenuTemplateCache', 'buildDashboardTemplateCache', 'buildFrameworkTemplateCache', 'buildModulesCSS', 'buildAppTemplateCache', 'LessCompileApp'],
        ['buildModulesJavaScript', 'buildAppJavaScript'],
        'inject');
});