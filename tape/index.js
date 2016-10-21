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
      notEqual: function() {
        return !t.equal.apply(t, arguments);
      },
      end: function() {
        var nextTest = callbacks.shift();
        delete this.equal;
        delete this.end;
        nextTest();
      }
    };
    callbacks.push(cb.bind(null, t));
  };

  test.init = function() {
    var firstTest = callbacks.shift();
    firstTest && firstTest();
  };

  return test;
}());

if (typeof module === 'object' && module.exports) {
  module.exports = test;
}
