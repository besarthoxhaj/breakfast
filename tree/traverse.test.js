'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Tree} = require('./binary.js');
var {fifo,preOrder,inOrder,postOrder} = require('./traverse.js');

var tree = (new Tree(30))
  .insert(20).insert(40)
  .insert(25).insert(35)
  .insert(10).insert(50);

/*
        30
    20      40
  10  25  35  50
 */

test('FIFO -> should return the correct order of elements', t => {
  var visitOrder = fifo(tree.root);
  t.ok(deepEqual(visitOrder,[30,20,40,10,25,35,50]),'got right visit order');
  t.end();
});

test('PRE-ORDER -> should return the correct order of elements', t => {
  var visitOrder = preOrder(tree.root);
  t.ok(deepEqual(visitOrder,[30,20,10,25,40,35,50]),'got right visit order');
  t.end();
});

test('IN-ORDER -> should return the correct order of elements', t => {
  var visitOrder = inOrder(tree.root);
  t.ok(deepEqual(visitOrder,[10,20,25,30,35,40,50]),'got right visit order');
  t.end();
});

test('POST-ORDER -> should return the correct order of elements', t => {
  var visitOrder = postOrder(tree.root);
  t.ok(deepEqual(visitOrder,[10,25,20,35,50,40,30]),'got right visit order');
  t.end();
});

test.init();