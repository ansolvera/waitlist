// ********************
// DECLARE VARIABLES
// ********************

const { gulp, src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const csspurge = require('gulp-css-purge');

// ********************
// CREATE FUNCTIONS
// ********************

function scssTask () {
    let plugins = [ csspurge, autoprefixer({ cascade: false }), cssnano ];
    return src('assets/scss/main.scss', {sourcemaps: true })
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(dest('.', {sourcemaps: '.'}));
}

function jsTask() {
    return src('assets/js/index.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('.', { sourcemaps: '.' }));
}

function serverTask(cb) {
    browsersync.init({
        server: { baseDir: './' }
    }); cb();
}

function reloadTask(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch(['*.php', '*.html'], reloadTask);
    watch(['assets/**/*.scss', 'assets/**/*.js'], series(scssTask, jsTask, reloadTask));
}

// ********************
// CREATE TASKS
// ********************

exports.default = series(
    scssTask,
    jsTask,
    serverTask,
    watchTask
);

exports.build = series(
    scssTask,
    jsTask
);

exports.serve = series(
    serverTask,
    watchTask
);

