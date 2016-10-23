'use strict';

// Load fake document if document is not in the current environment.
// This will be useful because in our test environment we don't have document,
// so we will create a fake document
if (typeof document !== 'object') {
  var document = require('./fakeDocument');
}

var jQuery = (function (document) {
  var elm; // current selected element

  var jQuery = function(selector) {
    elm = document.querySelectorAll(selector);
    return jQuery;
  };

  jQuery.addClass = function(className) {
    elm.forEach(function(el) {
      el.classList.add(className);
    });
    return jQuery;
  };

  jQuery.removeClass = function(className) {
    elm.forEach(function(el) {
      el.classList.remove(className);
    });
    return jQuery;
  };

  jQuery.toggleClass = function(className) {
    elm.forEach(function(el) {
      el.classList.toggle(className);
    });
    return jQuery;
  };
  return jQuery;
}(document));

if (typeof module === 'object' && module.exports) {
  module.exports = jQuery;
}
