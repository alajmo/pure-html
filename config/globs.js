module.exports = config => ({
  src: {
    css: `${config.src}/**/*.css`,
    html: `${config.src}/**/*.html`
  },
  dest: {
    html: `${config.dest}/**/*.html`
  }
});
