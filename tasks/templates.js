import gulp from 'gulp';
import plumber from 'gulp-plumber';
import fileinclude from 'gulp-file-include';
import htmlbeautify from 'gulp-html-beautify';
import config from './config';

export const templates = (cb) => {
  gulp.src('app/pages/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'app', // '@file', '@root'
    }))
    .pipe(htmlbeautify({
      indent_with_tabs: false,
      indent_size: 2,
      max_preserve_newlines: 0,
    }))
    .pipe(gulp.dest(`${config.dist}/`));

  cb();
};
