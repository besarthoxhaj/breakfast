'use strict';
/* @flow */

var test = require('../tape/index.js');
var Queue = require('./index.js');

test('Queue -> insertion', t => {
  var myQueue = new Queue();
  myQueue.insert('one');
  myQueue.insert('two');
  myQueue.insert('three');
  t.equal(myQueue.getSize(),3,'got size 3 of the queue');
  t.equal(myQueue.getFront(),'one','got right front element');
  t.end();
});

test('Queue -> remove', t => {
  var myQueue = new Queue();
  myQueue.insert('one');
  myQueue.insert('two');
  myQueue.insert('three');
  t.equal(myQueue.remove(),'one','remove return front element');
  t.equal(myQueue.getSize(),2,'got size 2 of the queue');
  t.end();
});

test.init();