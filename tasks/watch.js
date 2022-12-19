import gulp from 'gulp';
import { styles, stylesLinter } from './styles';
import { scripts } from './scripts';
import { sprites } from './sprites';
import { templates } from './templates';
import { images } from './images';
import { libsConcatCss, libsConcatJs, libsCss, libsJs } from './libs';
import { copy } from './copy';

export const watch = (cb) => {
  gulp.watch(['app/images/sprite-icons/**/*.svg'], sprites);
  gulp.watch('app/{pages,blocks}/**/*.html', templates);
  gulp.watch('app/{styles,blocks}/**/*.scss', gulp.parallel(styles, stylesLinter));
  gulp.watch('app/{scripts,blocks}/**/*.js', scripts);
  gulp.watch('libs-links.js', gulp.parallel(libsJs, libsCss));
  gulp.watch('libs-links-concat.js', gulp.parallel(libsConcatJs, libsConcatCss));
  gulp.watch('app/libs/js/*.js', libsJs);
  gulp.watch('app/libs/css/*.css', libsCss);
  gulp.watch('app/resources/**/*', copy);
  gulp.watch('app/images/**/*', images);

  cb();
};
