'use strict';
/* @flow */

var deepEqual = function(x, y) {
  var result = (function testEquality (a,b){
    if(typeof a !== 'object' && typeof b !== 'object') {
      return a === b;
    } else if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    } else {
      return Object.keys(a).every(function(key) {
        return testEquality(a[key], b[key]);
      });
    }
  }(x,y));
  if(result === false) {
    console.log(`
    ACTUAL: ${JSON.stringify(x)}
    EXPECTED: ${JSON.stringify(y)}
    `);
  }
  return result;
};

if (typeof module === 'object' && module.exports) {
  module.exports = deepEqual;
}
