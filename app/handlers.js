'use strict';

exports.getUsers = async function getUsers(request, h) {
  return h.response('Test message from getUsers').code(200);
};
