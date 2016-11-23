'use strict';
/* @flow */

var test = require('../tape/index.js');
var {SinglyList,Node} = require('./single.js');

test('Node -> should hold `data` and `next` properties', t => {
  var node = new Node('hello');
  t.equal(node.data,'hello','got `data` property');
  t.equal(node.next,undefined,'got `next` property');
  t.end();
});

test('SinglyList -> should have a count property', t => {
  var list = new SinglyList();
  t.equal(list.length,0,'start at `length` 0');
  t.end();
});

test('SinglyList -> should have an `insert` method', t => {
  var list = new SinglyList();
  list.insert('one');
  list.insert('two');
  list.insert('three');
  t.equal(list.length,3,'new `length` is 3');
  t.end();
});

test('SinglyList -> should have an `head` property', t => {
  var list = new SinglyList();
  list.insert('one');
  list.insert('two');
  list.insert('three');
  t.equal(list.head.data,'one','`head` got right data');
  t.end();
});

test('SinglyList -> should have an `getAt` method', t => {
  var list = new SinglyList();
  list.insert('one');
  list.insert('two');
  list.insert('three');
  list.insert('four');
  t.equal(list.getAt(2),'three','`getAt(2)` got right data');
  t.end();
});

test('SinglyList -> should have an `getAt` method', t => {
  var list = new SinglyList();
  list.insert('zero');
  list.insert('two');
  list.insert('three');
  list.insert('five');
  t.equal(list.getAt(2),'three','`getAt(2)` got right data');
  list.insertAt(1,'one');
  t.equal(list.getAt(2),'two','`getAt(2)` got right data');
  list.insertAt(4,'four');
  t.equal(list.getAt(4),'four','`getAt(4)` got right data');
  t.end();
});

test.init();