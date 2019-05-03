'use strict';

const SQL = require('./mysql.js');

exports.getUsers = async function getUsers(request, h) {
  return request.pool.query(SQL.getUsers).then((rows) => {
    return h.response(rows).code(200);
  }).catch ((err) => {
    return h.response().code(500);
  });
};
