const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy(['/graphql', '/sockjs-node'], {
      target: 'http://localhost:5000'
    })
  );
};
