'use strict';

module.exports = function find(tree, searchParams) {

  const results = [];
  const searchParamsKeys = Object.keys(searchParams);

  (function walk(subTree) {

    const keys = Object.keys(subTree);
    let maybeCounter = searchParamsKeys.length;

    keys.forEach(key => {

      const valueKey = subTree[key];
      const type = Object.prototype.toString.call(valueKey);
      const isString = (type === '[object String]');
      const isObject = (type === '[object Object]');
      const isArray = (type === '[object Array]');
      const hasSameValue = (valueKey === searchParams[key]);

      if (isObject) walk(valueKey);
      if (isArray) valueKey.forEach(walk);

      if (isString && hasSameValue) {

        maybeCounter -= 1;
        if (maybeCounter === 0) results.push(subTree);
      }
    });
  })(tree);

  return results;
}