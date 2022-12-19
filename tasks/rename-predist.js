import fs from 'fs';
import config from './config';

export const renamePredist = (cb) => {
  if (config.isProd) {
    fs.rename('./pre-dist', './dist', (err) => {
      if (err) {
        throw err;
      }

      cb();
    });
  }
};
