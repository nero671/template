import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';

export const sprites = (cb) => {
  gulp.src('app/images/sprite-icons/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true,
      },
    }))
    .pipe(cheerio({
      run($) {
        $('[fill]')
          .removeAttr('fill');
        $('[stroke]')
          .removeAttr('stroke');
        $('[style]')
          .removeAttr('style');
      },
      parserOptions: {
        xmlMode: true,
      },
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../../../app/images/sprite.svg',
          render: {
            scss: {
              dest: '../../styles/helpers/sprite',
              template: 'app/styles/helpers/sprite_template.scss',
            },
          },
        },
      },
    }))
    .pipe(gulp.dest('app/images/'));

  cb();
};
