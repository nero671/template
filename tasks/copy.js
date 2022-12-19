import gulp from 'gulp';
import changed from 'gulp-changed';
import config from './config';

export const copy = (cb) => {
  gulp.src('app/resources/**/*')
    .pipe(changed(config.dist))
    .pipe(gulp.dest(config.dist));

  gulp.src('app/resources/favicons/favicon.ico')
    .pipe(changed(config.dist))
    .pipe(gulp.dest(config.dist));

  cb();
};
