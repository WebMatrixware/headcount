'use strict';

const { expect } = require('code');
const Lab = require('lab');
const { after, afterEach, before, beforeEach, describe, it } = exports.lab = Lab.script();

const Server = require('../server.js');

describe('Users', () => {

  it('should return 200 OK when the /users route is presented with a GET request', { plan: 1 }, async () => {

    let serv = await Server.Deployment({ initialize: true });
    let response = await serv.inject({
      method: 'GET',
      url: '/users'
    });

    expect(response.statusCode).to.equal(200);

    await serv.stop();
  });
});
