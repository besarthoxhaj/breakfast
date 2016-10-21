'use strict';
/* @flow */

var test = require('../tape/index.js');
var DOM = require('./index.js');

function fakeDOM() {

  var fakeClassList = ['zoo'];

  fakeClassList.add = function(className) {
    fakeClassList.push(className);
  };

  fakeClassList.remove = function(className) {
    var idx = fakeClassList.indexOf(className);
    fakeClassList.splice(idx,1);
  };

  fakeClassList.toggle = function(className) {
    if(fakeClassList.indexOf(className) > -1) {
      fakeClassList.remove(className);
    } else {
      fakeClassList.add(className);
    }
  };

  var DOM = {
    elm: [{
      classList: fakeClassList
    }],
    querySelectorAll: function() {
      return DOM.elm;
    }
  };
  return DOM;
};

test('jQuery always return jQuery', function(t) {
  var document = fakeDOM();
  var $ = DOM(document);

  t.equal($('#Gabriel'), $, 'yeah it returns jQuery');
  t.end();
});

test('Fake element should be updated with the new class', function(t) {
  var document = fakeDOM();
  var $ = DOM(document);

  $('#foo').addClass('bar');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('bar'), 1, 'got the new class bar');
  t.end();
});

test('Chaining addClass', function(t) {
  var document = fakeDOM();
  var $ = DOM(document);

  $('foo').addClass('foo').addClass('foobar');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('foo'), 1, 'got the new class bar');
  t.equal(actual.indexOf('foobar'), 2, 'got the new class foobar');
  t.end();
});

test('removeClass', function(t) {
  var document = fakeDOM();
  var $ = DOM(document);

  $('foo').removeClass('zoo');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('zoo'), -1, 'remove class bar');
  t.end();
});

test('toggleClass should remove an already existing class', function(t) {
  var document = fakeDOM();
  var $ = DOM(document);

  $('foo').toggleClass('zoo');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('zoo'), -1, 'remove class bar');
  t.end();
});

test('toggleClass should add a class that does not exist', function(t) {
  var document = fakeDOM();
  var $ = DOM(document);

  $('foo').toggleClass('mattia');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('mattia'), 1, 'added class');
});

test.init();
