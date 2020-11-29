'use strict';

var deepEqual = require('../deep-equal/index.js');

/**
 *
 *
 *
 */
var test = (function () {
  'use strict';

  var callbacks = [];
  var testResult = {pass:0,fail:0};
  var hasOnly = false;

  function test(description, cb) {
    var t = {
      equal: function(actual, expected, message) {
        if (actual === expected) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message + '. Expected: ' + expected + '. Actual: ' + actual);
          testResult.fail++;
        }
      },
      deepEqual: function(actual, expected, message) {
        if (deepEqual(actual, expected)) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message + '. Expected: ' + expected + '. Actual: ' + actual);
          testResult.fail++;
        }
      },
      ok: function(value, message) {
        if (value) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message);
          testResult.fail++;
        }
      },
      notOk: function(value, message) {
        if (!value) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message);
          testResult.fail++;
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
          console.log(`
          TEST COMPLETED:
          PASS: ${testResult.pass}
          FAIL: ${testResult.fail}
          `);
        }
      }
    };
    callbacks.push({
      fun: cb.bind(undefined, t),
      mess: description
    });
  };

  test.only = function(description, cb) {
    hasOnly = true;
    var t = {
      equal: function(actual, expected, message) {
        if (actual === expected) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message + '. Expected: ' + expected + '. Actual: ' + actual);
          testResult.fail++;
        }
      },
      ok: function(value, message) {
        if (value) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message);
          testResult.fail++;
        }
      },
      notOk: function(value, message) {
        if (!value) {
          console.log('PASS: ' + message);
          testResult.pass++;
        } else {
          console.error('ERROR: ' + message);
          testResult.fail++;
        }
      },
      end: function() {
        console.log(`
        ONLY COMPLETED:
        PASS: ${testResult.pass}
        FAIL: ${testResult.fail}
        `);
      }
    };
    console.log('#',description);
    return cb(t);
  }

  test.init = function() {
    if(hasOnly) return;
    var firstTest = callbacks.shift();
    if (firstTest !== undefined) {
      console.log('#',firstTest.mess);
      firstTest.fun();
    }
  };

  return test;
}());

/**
 *
 *
 *
 */
if (typeof module === 'object' && module.exports) {
  module.exports = test;
}
