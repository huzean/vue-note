let isDev = process.env.mode === 'dev';

module.exports = {
  lintOnSave: false,
  publicPath: isDev ? './' : '/vue-components/',
};
