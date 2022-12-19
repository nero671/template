app.addLibs = {
  name: 'addLibs',
  description: 'connect the script library dynamically',
  addScriptFile(nameFile, callback) {
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    script.onload = () => callback && callback();
    script.src = `${app.pathToLibsFiles}/js/${nameFile}.js`;
    body.appendChild(script);
  },
  addStyleFile(nameFile) {
    const appCss = document.getElementById('app-css');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${app.pathToLibsFiles}/css/${nameFile}.css`;
    appCss.before(link);
  },
  initScript(nameFile, nameLib, callback) {
    let hasLibs = null;
    const scripts = document.querySelectorAll('script');
    scripts.forEach((el) => {
      const str = el.getAttribute('src');
      if (str) {
        if (str.indexOf(nameFile) >= 0) {
          hasLibs = true;
        }
      }
    });
    if (!hasLibs) {
      this.addScriptFile(nameFile, callback);
    } else {
      const timerId = setInterval(() => {
        if (window[nameLib] || (window.jQuery && jQuery()[nameLib])) {
          callback();
          clearInterval(timerId);
        }
      }, 1);
    }
  },
  initStyle(nameFile) {
    let hasLibs = null;
    const link = document.querySelectorAll('link');
    link.forEach((el) => {
      const str = el.getAttribute('src');
      if (str) {
        if (str.indexOf(nameFile) >= 0) {
          hasLibs = true;
        }
      }
    });
    if (!hasLibs) {
      this.addStyleFile(nameFile);
    }
  },
};
