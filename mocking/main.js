'use strict';
/* @flow */

var jQuery = function(document) {
  return function(selector) {
    var element = document.querySelector(selector);
    var obj = {};

    obj.addClass = function (newClass) {
      element.classList.add(newClass);
      return obj;
    };

    obj.text = function (text) {
      element.innerHTML = text;
      return obj;
    };

    return obj;
  };
};

var $ = jQuery(/* fake doc */);
