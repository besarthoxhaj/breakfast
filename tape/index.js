var test = (function () {
  'use strict';

  var callbacks = [];

  function test(description, cb) {
    var t = {
      equal: function(actual, expected, message) {
        if (actual === expected) {
          console.log('PASS: ' + message);
        } else {
          console.error('ERROR: ' + message + '. Expected: ' + expected + '. Actual: ' + actual);
        }
      },
      notEqual: function(actual, expected, message) {
        if (actual !== expected) {
          console.log('PASS: ' + message);
        } else {
          console.error('ERROR: ' + message + '. Expected: ' + expected + '. Actual: ' + actual);
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
        if(nextTest !== undefined) {
          console.log('#',nextTest.mess);
          nextTest.fun();
        } else {
          console.log('TEST COMPLETED');
        }
      }
    };
    callbacks.push({
      fun: cb.bind(undefined, t),
      mess: description
    });
  };

  test.init = function() {
    var firstTest = callbacks.shift();
    if (firstTest !== undefined) {
      console.log('#',firstTest.mess);
      firstTest.fun();
    }
  };

  return test;
}());

if (typeof module === 'object' && module.exports) {
  module.exports = test;
}
