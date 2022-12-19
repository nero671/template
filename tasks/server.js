import { create as browserSync } from 'browser-sync';

const bs = browserSync('server');
const { PORT, TUNNEL } = process.env;

export const server = (cb) => {
  bs.init({
    files: [
      'dist/**/*',
    ],
    open: false,
    notify: false,
    reloadOnRestart: true,
    port: PORT || 3000,
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
      },
    },
    server: {
      baseDir: [
        'app/resources',
        'dist',
      ],
      directory: false,
    },
    tunnel: !!TUNNEL,
  });

  cb();
};
