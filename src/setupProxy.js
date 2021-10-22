const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/reverse?format=json/',
        createProxyMiddleware({
          target: 'https://nominatim.openstreetmap.org',
          changeOrigin: true,
        })
      );
    app.use(
        '/?format=json/',
        createProxyMiddleware({
          target: 'https://nominatim.openstreetmap.org',
          changeOrigin: true,
        })
      );
};