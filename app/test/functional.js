'use strict';

const { expect } = require('code');
const Lab = require('lab');
const { after, afterEach, before, beforeEach, describe, it } = exports.lab = Lab.script();

const Server = require('../server.js');

describe('Functional tests', () => {

  it('server should respond with 200 OK on GET request to default route', { plan: 1 },  async () => {

    let serv = await Server.Deployment({ initialize: true });
    let response = await serv.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).to.equal(200);

    await serv.stop();
  });

  it('server should have a non-null start time', { plan: 1 }, async () => {

    let serv = await Server.Deployment({ start: true });
    let info = serv.info;

    expect(info.started).to.not.be.null();

    await serv.stop();
  });
});
