module.exports = ({ src, dest }) => ({
  src: {
    css: `${src}/**/*.css`,
    js: `${src}/**/*.js`,
    html: `${src}/**/*.html`
  },
  dest: {
    html: `${dest}/**/*.html`
  }
});
