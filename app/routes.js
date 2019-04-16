'use strict';

module.exports = {
  register: async (server, options) => {
    server.route([{
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: './html',
          redirectToSlash: true,
          index: true,
        }
      }
    }]);
  },
  name: 'routes',
  version: '1.0.0'
}
