/* */ 
(function(process) {
  'use strict';
  var utils = require('../utils');
  var settle = require('../core/settle');
  var buildURL = require('../helpers/buildURL');
  var parseHeaders = require('../helpers/parseHeaders');
  var isURLSameOrigin = require('../helpers/isURLSameOrigin');
  var createError = require('../core/createError');
  var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('../helpers/btoa');
  module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type'];
      }
      var request = new XMLHttpRequest();
      var loadEvent = 'onreadystatechange';
      var xDomain = false;
      if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
        request = new window.XDomainRequest();
        loadEvent = 'onload';
        xDomain = true;
        request.onprogress = function handleProgress() {};
        request.ontimeout = function handleTimeout() {};
      }
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }
      request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      request[loadEvent] = function handleLoad() {
        if (!request || (request.readyState !== 4 && !xDomain)) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };
        settle(resolve, reject, response);
        request = null;
      };
      request.onerror = function handleError() {
        reject(createError('Network Error', config));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
        request = null;
      };
      if (utils.isStandardBrowserEnv()) {
        var cookies = require('../helpers/cookies');
        var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            delete requestHeaders[key];
          } else {
            request.setRequestHeader(key, val);
          }
        });
      }
      if (config.withCredentials) {
        request.withCredentials = true;
      }
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
          request.abort();
          reject(cancel);
          request = null;
        });
      }
      if (requestData === undefined) {
        requestData = null;
      }
      request.send(requestData);
    });
  };
})(require('process'));
