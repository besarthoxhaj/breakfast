var test = require('../tape');

function arrayDeepEqual(array1, array2) {
  if (array1.length !== array2.length) return false;
  return array1.every(function(element, index) {
    if(({}).toString.call(element) === '[object Array]') {
      return arrayDeepEqual(element,array2[index]);
    }
    if(({}).toString.call(element) === '[object Object]') {
      return objectDeepEqual(element,array2[index]);
    }
    return element === array2[index];
  });
}

function objectDeepEqual(object1, object2) {
  if(Object.keys(object1).length !== Object.keys(object2).length) return false;
  return Object.keys(object1).every(function(key) {
    if(({}).toString.call(object1[key]) === '[object Object]') {
      return objectDeepEqual(object1[key],object2[key]);
    }
    if(({}).toString.call(object1[key]) === '[object Array]') {
      return arrayDeepEqual(object1[key],object2[key]);
    }
    return object1[key] === object2[key];
  });
}

function deepEqual(object1, object2) {
  if(({}).toString.call(object1) === '[object Array]') {
    return arrayDeepEqual(object1, object2);
  }

  return objectDeepEqual(object1, object2);
}

if (typeof module === 'object' && module.exports) {
  module.exports = deepEqual;
}
