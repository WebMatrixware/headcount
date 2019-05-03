'use strict';

const { expect } = require('code');
const Lab = require('lab');
const { after, afterEach, before, beforeEach, describe, it } = exports.lab = Lab.script();
const Proxyquire = require('proxyquire');
const Sinon = require('sinon');

const Server = require('../server.js');
const Handlers = require('../handlers.js');

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

  it('should return a JSON list of users', { plan: 1 }, async () => {

    let serv = await Server.Deployment({ initialize: true });
    let response = await serv.inject({
      method: 'GET',
      url: '/users'
    });

    expect(response.payload).to.startWith('[{');

    await serv.stop();
  });

  it('should return 500 internal error when there is a DB query problem', { plan: 1 }, async () => {

    let stubRequest = {
      path: false,
      pool: {
        query: Sinon.stub().returns(new Promise((resolve, reject) => {
          if (path) {
            resolve(new Error('500 error'));
          } else {
            reject(new Error('500 error'));
          }
        }))
      }
    };
    let stubH = {
      response: () => {
        return {
          code: () => { return 500 }
        }
      }
    };

    let result = await Handlers.getUsers(stubRequest, stubH);

    expect(result).to.equal(500);

  });
});
