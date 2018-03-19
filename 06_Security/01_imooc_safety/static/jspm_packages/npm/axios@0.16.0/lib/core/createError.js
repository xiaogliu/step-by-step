/* */ 
'use strict';
var enhanceError = require('./enhanceError');
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};
