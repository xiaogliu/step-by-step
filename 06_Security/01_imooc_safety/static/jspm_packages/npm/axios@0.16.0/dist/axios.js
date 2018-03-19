/* */ 
"format cjs";
(function(process) {
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory();
    else if (typeof define === 'function' && define.amd)
      define([], factory);
    else if (typeof exports === 'object')
      exports["axios"] = factory();
    else
      root["axios"] = factory();
  })(this, function() {
    return (function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    })([function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var bind = __webpack_require__(3);
      var Axios = __webpack_require__(4);
      var defaults = __webpack_require__(5);
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
      axios.Cancel = __webpack_require__(22);
      axios.CancelToken = __webpack_require__(23);
      axios.isCancel = __webpack_require__(19);
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = __webpack_require__(24);
      module.exports = axios;
      module.exports.default = axios;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var bind = __webpack_require__(3);
      var toString = Object.prototype.toString;
      function isArray(val) {
        return toString.call(val) === '[object Array]';
      }
      function isArrayBuffer(val) {
        return toString.call(val) === '[object ArrayBuffer]';
      }
      function isFormData(val) {
        return (typeof FormData !== 'undefined') && (val instanceof FormData);
      }
      function isArrayBufferView(val) {
        var result;
        if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
          result = ArrayBuffer.isView(val);
        } else {
          result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
        }
        return result;
      }
      function isString(val) {
        return typeof val === 'string';
      }
      function isNumber(val) {
        return typeof val === 'number';
      }
      function isUndefined(val) {
        return typeof val === 'undefined';
      }
      function isObject(val) {
        return val !== null && typeof val === 'object';
      }
      function isDate(val) {
        return toString.call(val) === '[object Date]';
      }
      function isFile(val) {
        return toString.call(val) === '[object File]';
      }
      function isBlob(val) {
        return toString.call(val) === '[object Blob]';
      }
      function isFunction(val) {
        return toString.call(val) === '[object Function]';
      }
      function isStream(val) {
        return isObject(val) && isFunction(val.pipe);
      }
      function isURLSearchParams(val) {
        return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
      }
      function trim(str) {
        return str.replace(/^\s*/, '').replace(/\s*$/, '');
      }
      function isStandardBrowserEnv() {
        if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
          return false;
        }
        return (typeof window !== 'undefined' && typeof document !== 'undefined');
      }
      function forEach(obj, fn) {
        if (obj === null || typeof obj === 'undefined') {
          return;
        }
        if (typeof obj !== 'object' && !isArray(obj)) {
          obj = [obj];
        }
        if (isArray(obj)) {
          for (var i = 0,
              l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
          }
        } else {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              fn.call(null, obj[key], key, obj);
            }
          }
        }
      }
      function merge() {
        var result = {};
        function assignValue(val, key) {
          if (typeof result[key] === 'object' && typeof val === 'object') {
            result[key] = merge(result[key], val);
          } else {
            result[key] = val;
          }
        }
        for (var i = 0,
            l = arguments.length; i < l; i++) {
          forEach(arguments[i], assignValue);
        }
        return result;
      }
      function extend(a, b, thisArg) {
        forEach(b, function assignValue(val, key) {
          if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
          } else {
            a[key] = val;
          }
        });
        return a;
      }
      module.exports = {
        isArray: isArray,
        isArrayBuffer: isArrayBuffer,
        isFormData: isFormData,
        isArrayBufferView: isArrayBufferView,
        isString: isString,
        isNumber: isNumber,
        isObject: isObject,
        isUndefined: isUndefined,
        isDate: isDate,
        isFile: isFile,
        isBlob: isBlob,
        isFunction: isFunction,
        isStream: isStream,
        isURLSearchParams: isURLSearchParams,
        isStandardBrowserEnv: isStandardBrowserEnv,
        forEach: forEach,
        merge: merge,
        extend: extend,
        trim: trim
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function bind(fn, thisArg) {
        return function wrap() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          return fn.apply(thisArg, args);
        };
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var defaults = __webpack_require__(5);
      var utils = __webpack_require__(2);
      var InterceptorManager = __webpack_require__(16);
      var dispatchRequest = __webpack_require__(17);
      var isAbsoluteURL = __webpack_require__(20);
      var combineURLs = __webpack_require__(21);
      function Axios(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }
      Axios.prototype.request = function request(config) {
        if (typeof config === 'string') {
          config = utils.merge({url: arguments[0]}, arguments[1]);
        }
        config = utils.merge(defaults, this.defaults, {method: 'get'}, config);
        if (config.baseURL && !isAbsoluteURL(config.url)) {
          config.url = combineURLs(config.baseURL, config.url);
        }
        var chain = [dispatchRequest, undefined];
        var promise = Promise.resolve(config);
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      };
      utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url
          }));
        };
      });
      utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
        Axios.prototype[method] = function(url, data, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
            data: data
          }));
        };
      });
      module.exports = Axios;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var normalizeHeaderName = __webpack_require__(6);
      var DEFAULT_CONTENT_TYPE = {'Content-Type': 'application/x-www-form-urlencoded'};
      function setContentTypeIfUnset(headers, value) {
        if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
          headers['Content-Type'] = value;
        }
      }
      function getDefaultAdapter() {
        var adapter;
        if (typeof XMLHttpRequest !== 'undefined') {
          adapter = __webpack_require__(7);
        } else if (typeof process !== 'undefined') {
          adapter = __webpack_require__(7);
        }
        return adapter;
      }
      var defaults = {
        adapter: getDefaultAdapter(),
        transformRequest: [function transformRequest(data, headers) {
          normalizeHeaderName(headers, 'Content-Type');
          if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
            return data;
          }
          if (utils.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
          }
          if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
          }
          return data;
        }],
        transformResponse: [function transformResponse(data) {
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {}
          }
          return data;
        }],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        }
      };
      defaults.headers = {common: {'Accept': 'application/json, text/plain, */*'}};
      utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
        defaults.headers[method] = {};
      });
      utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
        defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
      });
      module.exports = defaults;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function normalizeHeaderName(headers, normalizedName) {
        utils.forEach(headers, function processHeader(value, name) {
          if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
          }
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var settle = __webpack_require__(8);
      var buildURL = __webpack_require__(11);
      var parseHeaders = __webpack_require__(12);
      var isURLSameOrigin = __webpack_require__(13);
      var createError = __webpack_require__(9);
      var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(14);
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
          if (("production") !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
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
            var cookies = __webpack_require__(15);
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
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var createError = __webpack_require__(9);
      module.exports = function settle(resolve, reject, response) {
        var validateStatus = response.config.validateStatus;
        if (!response.status || !validateStatus || validateStatus(response.status)) {
          resolve(response);
        } else {
          reject(createError('Request failed with status code ' + response.status, response.config, null, response));
        }
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var enhanceError = __webpack_require__(10);
      module.exports = function createError(message, config, code, response) {
        var error = new Error(message);
        return enhanceError(error, config, code, response);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function enhanceError(error, config, code, response) {
        error.config = config;
        if (code) {
          error.code = code;
        }
        error.response = response;
        return error;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
      }
      module.exports = function buildURL(url, params, paramsSerializer) {
        if (!params) {
          return url;
        }
        var serializedParams;
        if (paramsSerializer) {
          serializedParams = paramsSerializer(params);
        } else if (utils.isURLSearchParams(params)) {
          serializedParams = params.toString();
        } else {
          var parts = [];
          utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') {
              return;
            }
            if (utils.isArray(val)) {
              key = key + '[]';
            }
            if (!utils.isArray(val)) {
              val = [val];
            }
            utils.forEach(val, function parseValue(v) {
              if (utils.isDate(v)) {
                v = v.toISOString();
              } else if (utils.isObject(v)) {
                v = JSON.stringify(v);
              }
              parts.push(encode(key) + '=' + encode(v));
            });
          });
          serializedParams = parts.join('&');
        }
        if (serializedParams) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
        }
        return url;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function parseHeaders(headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
          return parsed;
        }
        utils.forEach(headers.split('\n'), function parser(line) {
          i = line.indexOf(':');
          key = utils.trim(line.substr(0, i)).toLowerCase();
          val = utils.trim(line.substr(i + 1));
          if (key) {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        });
        return parsed;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = (utils.isStandardBrowserEnv() ? (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute('href', href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol && parsed.host === originURL.host);
        };
      })() : (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })());
    }, function(module, exports) {
      'use strict';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      function E() {
        this.message = 'String contains an invalid character';
      }
      E.prototype = new Error;
      E.prototype.code = 5;
      E.prototype.name = 'InvalidCharacterError';
      function btoa(input) {
        var str = String(input);
        var output = '';
        for (var block,
            charCode,
            idx = 0,
            map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
          charCode = str.charCodeAt(idx += 3 / 4);
          if (charCode > 0xFF) {
            throw new E();
          }
          block = block << 8 | charCode;
        }
        return output;
      }
      module.exports = btoa;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = (utils.isStandardBrowserEnv() ? (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }
            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }
            if (secure === true) {
              cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },
          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() : (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {}
        };
      })());
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      function InterceptorManager() {
        this.handlers = [];
      }
      InterceptorManager.prototype.use = function use(fulfilled, rejected) {
        this.handlers.push({
          fulfilled: fulfilled,
          rejected: rejected
        });
        return this.handlers.length - 1;
      };
      InterceptorManager.prototype.eject = function eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      };
      InterceptorManager.prototype.forEach = function forEach(fn) {
        utils.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      };
      module.exports = InterceptorManager;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var transformData = __webpack_require__(18);
      var isCancel = __webpack_require__(19);
      var defaults = __webpack_require__(5);
      function throwIfCancellationRequested(config) {
        if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
        }
      }
      module.exports = function dispatchRequest(config) {
        throwIfCancellationRequested(config);
        config.headers = config.headers || {};
        config.data = transformData(config.data, config.headers, config.transformRequest);
        config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
        utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
          delete config.headers[method];
        });
        var adapter = config.adapter || defaults.adapter;
        return adapter(config).then(function onAdapterResolution(response) {
          throwIfCancellationRequested(config);
          response.data = transformData(response.data, response.headers, config.transformResponse);
          return response;
        }, function onAdapterRejection(reason) {
          if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            if (reason && reason.response) {
              reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
            }
          }
          return Promise.reject(reason);
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function transformData(data, headers, fns) {
        utils.forEach(fns, function transform(fn) {
          data = fn(data, headers);
        });
        return data;
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function isCancel(value) {
        return !!(value && value.__CANCEL__);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function isAbsoluteURL(url) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function combineURLs(baseURL, relativeURL) {
        return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
      };
    }, function(module, exports) {
      'use strict';
      function Cancel(message) {
        this.message = message;
      }
      Cancel.prototype.toString = function toString() {
        return 'Cancel' + (this.message ? ': ' + this.message : '');
      };
      Cancel.prototype.__CANCEL__ = true;
      module.exports = Cancel;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var Cancel = __webpack_require__(22);
      function CancelToken(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }
        var resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        var token = this;
        executor(function cancel(message) {
          if (token.reason) {
            return;
          }
          token.reason = new Cancel(message);
          resolvePromise(token.reason);
        });
      }
      CancelToken.prototype.throwIfRequested = function throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      };
      CancelToken.source = function source() {
        var cancel;
        var token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token: token,
          cancel: cancel
        };
      };
      module.exports = CancelToken;
    }, function(module, exports) {
      'use strict';
      module.exports = function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr);
        };
      };
    }]);
  });
  ;
})(require('process'));
