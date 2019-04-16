'use strict';

require('dotenv').config();

const Hapi = require('hapi');
const MySQL = require('promise-mysql');

const GoodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    consoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*', error: '*', request: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout'],
    fileReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*', error: '*', request: '*' }]
    }, {
      module: 'good-squeeze',
      name: 'SafeJson',
      args: [
        null,
        { separator: ',' }
      ]
    }, {
      module: 'rotating-file-stream',
      args: [
        'log.log',
        {
          size: '500M',
          interval: '1d',
          maxFiles: 30,
          path: './logs'
        }
      ]
    }]
  }
};

exports.Deployment = async (opts) => {

  const Server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT
  });

  const Pool = MySQL.createPool({
    connectionLimit: 20,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    debug: process.env.DB_DEBUG
  });

  Server.decorate('request', 'pool', Pool);

  await Server.register([{
    plugin: require('inert'),
    options: {}
  }, {
    plugin: require('./routes'),
    options: {}
  }, {
    plugin: require('blipp'),
    options: {}
  }, {
    plugin: require('vision'),
    options: {}
  }, {
    plugin: require('good'),
    options: GoodOptions
  }]);

  if (opts.start) {
    await Server.start();
  }

  if (opts.initialize) {
    await Server.initialize();
  }

  return Server
}

/* $lab:coverage:off$ */
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
/* $lab:coverage:on$ */
