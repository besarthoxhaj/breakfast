'use strict';
/* @flow */

var parallel = function(tasks,callback) {
  var ii = 0;
  var store = new Array(tasks.length);
  tasks.forEach(function(elm,idx) {
    elm(function(err,args) {
      if(err) return callback(err,store);
      store[idx] = args;
      if(++ii === tasks.length) {
        callback(undefined,store);
      }
    });
  });
};

if (typeof module === 'object' && module.exports) {
  module.exports = parallel;
}