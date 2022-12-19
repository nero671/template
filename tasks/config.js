const { NODE_ENV } = process.env;

const config = {
  imagesOptimize: false,
  setEnv() {
    this.isProd = NODE_ENV === 'prod' || process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
  setDist() {
    this.dist = this.isProd ? 'pre-dist' : 'dist';
  },
};

export default config;
