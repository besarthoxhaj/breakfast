'use strict';
/* @flow */

var deepEqual = function(x, y) {
  if(typeof x !== 'object' && typeof y !== 'object') {
    return x === y;
  } else if (Object.keys(x).length !== Object.keys(y).length) {
    return false;
  } else {
    return Object.keys(x).every(function(key) {
      return deepEqual(x[key], y[key]);
    });
  }
};

if (typeof module === 'object' && module.exports) {
  module.exports = deepEqual;
}
