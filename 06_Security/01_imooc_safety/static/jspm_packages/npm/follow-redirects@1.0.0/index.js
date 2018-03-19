/* */ 
'use strict';
var url = require('url');
var assert = require('assert');
var http = require('http');
var https = require('https');
var Writable = require('stream').Writable;
var debug = require('debug')('follow-redirects');
var nativeProtocols = {
  'http:': http,
  'https:': https
};
var schemes = {};
var exports = module.exports = {maxRedirects: 21};
var safeMethods = {
  GET: true,
  HEAD: true,
  OPTIONS: true,
  TRACE: true
};
var eventHandlers = Object.create(null);
['abort', 'aborted', 'error'].forEach(function(event) {
  eventHandlers[event] = function(arg) {
    this._redirectable.emit(event, arg);
  };
});
function RedirectableRequest(options, responseCallback) {
  Writable.call(this);
  this._options = options;
  this._redirectCount = 0;
  if (responseCallback) {
    this.on('response', responseCallback);
  }
  var self = this;
  this._onNativeResponse = function(response) {
    self._processResponse(response);
  };
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);
RedirectableRequest.prototype._performRequest = function() {
  var protocol = this._options.protocol;
  if (this._options.agents) {
    this._options.agent = this._options.agents[schemes[protocol]];
  }
  var nativeProtocol = nativeProtocols[this._options.protocol];
  var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);
  request._redirectable = this;
  for (var event in eventHandlers) {
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }
  if (this._currentResponse) {
    request.end();
  }
};
RedirectableRequest.prototype._processResponse = function(response) {
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false && response.statusCode >= 300 && response.statusCode < 400) {
    if (++this._redirectCount > this._options.maxRedirects) {
      return this.emit('error', new Error('Max redirects exceeded.'));
    }
    if (response.statusCode !== 307) {
      if (!(this._options.method in safeMethods)) {
        this._options.method = 'GET';
      }
    }
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug('redirecting to', redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._currentResponse = response;
    this._performRequest();
  } else {
    response.responseUrl = this._currentUrl;
    return this.emit('response', response);
  }
};
RedirectableRequest.prototype.abort = function() {
  this._currentRequest.abort();
};
RedirectableRequest.prototype.end = function(data, encoding, callback) {
  this._currentRequest.end(data, encoding, callback);
};
RedirectableRequest.prototype.flushHeaders = function() {
  this._currentRequest.flushHeaders();
};
RedirectableRequest.prototype.setNoDelay = function(noDelay) {
  this._currentRequest.setNoDelay(noDelay);
};
RedirectableRequest.prototype.setSocketKeepAlive = function(enable, initialDelay) {
  this._currentRequest.setSocketKeepAlive(enable, initialDelay);
};
RedirectableRequest.prototype.setTimeout = function(timeout, callback) {
  this._currentRequest.setTimeout(timeout, callback);
};
RedirectableRequest.prototype._write = function(chunk, encoding, callback) {
  this._currentRequest.write(chunk, encoding, callback);
};
Object.keys(nativeProtocols).forEach(function(protocol) {
  var scheme = schemes[protocol] = protocol.substr(0, protocol.length - 1);
  var nativeProtocol = nativeProtocols[protocol];
  var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);
  wrappedProtocol.request = function(options, callback) {
    if (typeof options === 'string') {
      options = url.parse(options);
      options.maxRedirects = exports.maxRedirects;
    } else {
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        protocol: protocol
      }, options);
    }
    assert.equal(options.protocol, protocol, 'protocol mismatch');
    debug('options', options);
    return new RedirectableRequest(options, callback);
  };
  wrappedProtocol.get = function(options, callback) {
    var request = wrappedProtocol.request(options, callback);
    request.end();
    return request;
  };
});
