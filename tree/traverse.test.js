'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Tree} = require('./binary.js');
var {
  isBinarySearchTree,
  postOrder,
  preOrder,
  inOrder,
  fifo,
} = require('./traverse.js');

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

test('IS-BST -> should check if a tree is a BST', t => {
  t.ok(isBinarySearchTree(tree.root),'real tree is BST');
  var fakeBstNode = {
    data:30,
    left:{data:20,left:{data:10},right:{data:25}},
    right:{data:40,left:{data:35},right:{data:50}},
  };
  t.ok(isBinarySearchTree(fakeBstNode),'fakeBstNode tree is BST too');
  var fakeNotBstNode = {
    data:30,
    left:{data:20,left:{data:10},right:{data:32}},
    right:{data:40,left:{data:35},right:{data:50}},
  };
  t.notOk(isBinarySearchTree(fakeNotBstNode),'fakeNotBstNode tree is BST too');
  t.end();
});

test.init();