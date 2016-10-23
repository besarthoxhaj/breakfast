'use strict';

var test = require('../tape/index.js');
var document = require('./fakeDocument.js');
var $ = require('./index.js');

test('jQuery always return jQuery', function(t) {
  document.$$reset$$();

  t.equal($('#Gabriel'), $, 'yeah it returns jQuery');
  t.end();
});

test('Fake element should be updated with the new class', function(t) {
  document.$$reset$$();

  $('#foo').addClass('bar');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('bar'), 1, 'got the new class bar');
  t.end();
});

test('Chaining addClass', function(t) {
  document.$$reset$$();

  $('foo').addClass('foo').addClass('foobar');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('foo'), 1, 'got the new class bar');
  t.equal(actual.indexOf('foobar'), 2, 'got the new class foobar');
  t.end();
});

test('removeClass', function(t) {
  document.$$reset$$();

  $('foo').removeClass('zoo');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('zoo'), -1, 'remove class bar');
  t.end();
});

test('toggleClass should remove an already existing class', function(t) {
  document.$$reset$$();

  $('foo').toggleClass('zoo');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('zoo'), -1, 'remove class bar');
  t.end();
});

test('toggleClass should add a class that does not exist', function(t) {
  document.$$reset$$();

  $('foo').toggleClass('mattia');
  var actual = document.elm[0].classList;
  t.equal(actual.indexOf('mattia'), 1, 'added class');
});

test.init();
