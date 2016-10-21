var DOM = function(document) {
  'use strict';

  return (function () {
    var elm;

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
  }());
};

if (typeof module === 'object' && module.exports) {
  module.exports = DOM;
}
