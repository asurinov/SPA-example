var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort');
var stripLine = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');

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

gulp.task('buildAppTemplateCache', function () {
    return gulp.src(['./app/**/*.html'])
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        }))
        .pipe(gulp.dest('./app/'));
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

gulp.task('buildAppJavaScript', function () {
    return gulp.src(['./app/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('app.js'))
        .pipe(stripLine(['use strict']))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('buildAppCSS', function () {
    return gulp.src(['./app/**/*.css'])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/'));
});