'use strict';

const Handlers = require('./handlers.js');

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
    }, {
      method: 'GET',
      path: '/users',
      handler: Handlers.getUsers,
      options: {
        description: 'Return optionally limited list of users with statuses',
        tags: ['users']
      }
    }]);
  },
  name: 'routes',
  version: '1.0.0'
}
