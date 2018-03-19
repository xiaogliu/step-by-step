/* */ 
(function(process) {
  var Stream = require('stream');
  var Writable = require('./lib/_stream_writable');
  if (process.env.READABLE_STREAM === 'disable') {
    module.exports = Stream && Stream.Writable || Writable;
  }
  module.exports = Writable;
})(require('process'));
