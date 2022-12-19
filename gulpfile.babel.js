import gulp from 'gulp';
import { styles, stylesLinter } from './tasks/styles';
import { scripts, scriptsLinter } from './tasks/scripts';
import { sprites } from './tasks/sprites';
import { templates } from './tasks/templates';
import { images } from './tasks/images';
import { libsJs, libsCss, libsConcatJs, libsConcatCss } from './tasks/libs';
import { copy } from './tasks/copy';
import { server } from './tasks/server';
import { watch } from './tasks/watch';
import { renamePredist } from './tasks/rename-predist';
import { createZip } from './tasks/zip';
import config from './tasks/config';

config.setEnv();
config.setDist();

// Develop
export const dev = gulp.series(
  copy,
  gulp.parallel(
    stylesLinter,
    libsJs,
    libsConcatJs,
    libsCss,
    libsConcatCss,
    styles,
    sprites,
    images,
    scripts,
    templates,
  ),
  server,
  watch,
);

// Production
export const build = gulp.parallel(
  scriptsLinter,
  libsJs,
  libsConcatJs,
  libsCss,
  libsConcatCss,
  styles,
  sprites,
  images,
  scripts,
  templates,
  copy,
);

// Rename field pre-dist to dist
export const renamePredistToDist = gulp.series(
  renamePredist,
);

// Scripts lint
export const scriptsLint = gulp.series(
  scriptsLinter,
);

// Styles lint
export const stylesLint = gulp.series(
  stylesLinter,
);

// Create zip
export const zip = gulp.series(
  createZip,
);
