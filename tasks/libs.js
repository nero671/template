import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import { libsJsLink, libsCssLink } from '../libs-links';
import { libsConcatJsLink, libsConcatCssLink } from '../libs-links-concat';
import config from './config';

// Separately
export const libsJs = (cb) => {
  if (libsJsLink.length > 0) {
    gulp.src(libsJsLink)
      .pipe(gulpif(config.isProd, uglify()))
      .pipe(gulp.dest(`${config.dist}/assets/libs/js`));
  }

  cb();
};

export const libsCss = (cb) => {
  if (libsCssLink.length > 0) {
    gulp.src(libsCssLink)
      .pipe(gulpif(config.isProd, cleanCSS()))
      .pipe(gulp.dest(`${config.dist}/assets/libs/css`));
  }

  cb();
};

// Concatenation
export const libsConcatJs = (cb) => {
  if (libsConcatJsLink.length > 0) {
    gulp.src(libsConcatJsLink)
      .pipe(concat('libs.min.js'))
      .pipe(gulpif(config.isProd, uglify()))
      .pipe(gulp.dest(`${config.dist}/assets/libs/js`));
  }

  cb();
};

export const libsConcatCss = (cb) => {
  if (libsConcatCssLink.length > 0) {
    gulp.src(libsConcatCssLink)
      .pipe(concat('libs.min.css'))
      .pipe(gulpif(config.isProd, cleanCSS()))
      .pipe(gulp.dest(`${config.dist}/assets/libs/css`));
  }

  cb();
};
