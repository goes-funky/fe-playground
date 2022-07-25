module.exports = {
  '/api': {
    target: 'https://dummyjson.com',
    pathRewrite: {
      '^/api': '',
    },
    secure: false,
    changeOrigin: 'true',
  },
};
