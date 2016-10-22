var test = (function () {
  'use strict';

  var callbacks = [];

  function test(description, cb) {
    var t = {
      equal: function(actual, expected, message) {
        if (actual === expected) {
          console.log('PASS: ' + message);
        } else {
          console.error('ERROR: ' + message);
        }
      },
      notEqual: function(actual, expected, message) {
        if (actual !== expected) {
          console.log('PASS: ' + message);
        } else {
          console.error('ERROR: ' + message);
        }
      },
      ok: function(value, message) {
        if (value) {
          console.log('PASS: ' + message);
        } else {
          console.error('ERROR: ' + message);
        }
      },
      notOk: function(value, message) {
        if (!value) {
          console.log('PASS: ' + message);
        } else {
          console.error('ERROR: ' + message);
        }
      },
      end: function() {
        var nextTest = callbacks.shift();
        delete this.equal;
        delete this.end;
        if(typeof nextTest === 'function') nextTest();
      }
    };
    callbacks.push(cb.bind(null, t));
  };

  test.init = function() {
    var firstTest = callbacks.shift();
    if (typeof firstTest === 'function') firstTest();
  };

  return test;
}());

if (typeof module === 'object' && module.exports) {
  module.exports = test;
}
