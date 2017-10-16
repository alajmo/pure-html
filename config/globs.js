module.exports = config => ({
  src: {
    css: `${config.src}/**/*.css`,
    js: `${config.src}/**/*.js`,
    html: `${config.src}/**/*.html`
  },
  dest: {
    html: `${config.dest}/**/*.html`
  }
});
