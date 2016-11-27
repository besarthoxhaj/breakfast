var test = (function () {
  'use strict';

  var callbacks = [];
  var testResult = {pass:0,fail:0};

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
      notEqual: function(actual, expected, message) {
        if (actual !== expected) {
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
