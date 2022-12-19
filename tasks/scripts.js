import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import config from './config';

const keepDebug = true;
const uglifyParams = {
  mangle: false,
  compress: {
    hoist_funs: true,
    hoist_vars: false,
    drop_debugger: !keepDebug,
  },
};

const jsFiles = [
  'app/scripts/app.js',
  'app/blocks/**/*.js',
  'app/scripts/common/**/*.js',
  'app/scripts/init.js',
];

export const scripts = (cb) => {
  gulp.src(jsFiles)
    .pipe(plumber({
      errorHandler(err) {
        notify.onError({
          title: 'Error ---> JS',
          message: '<%= error.message %>',
        })(err);
      },
    }))
    .pipe(gulpif(config.isDev, sourcemaps.init({
      loadMaps: true,
    })))
    .pipe(concat('app.min.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(gulpif(config.isProd, uglify(uglifyParams)))
    .pipe(gulpif(config.isDev, sourcemaps.write('.')))
    .pipe(gulp.dest(`${config.dist}/assets/scripts/`));

  cb();
};

const jsFilesLint = [
  'app/blocks/**/*.js',
  'app/scripts/**/*.js',
];

export const scriptsLinter = (cb) => {
  gulp.src(jsFilesLint)
    .pipe(plumber())
    .pipe(eslint({
      configFile: '.eslintrc',
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

  cb();
};
