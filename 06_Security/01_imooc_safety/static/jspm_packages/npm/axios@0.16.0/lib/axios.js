/* */ 
'use strict';
var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios;
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');
module.exports = axios;
module.exports.default = axios;
