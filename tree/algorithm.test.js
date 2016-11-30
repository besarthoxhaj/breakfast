'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Tree,Node} = require('./structure.js');
var {
  isBinarySearchTree,
  balanceTree,
  rightRotate,
  leftRotate,
  findHeight,
  deleteNode,
  treeToVine,
  postOrder,
  preOrder,
  findMax,
  findMin,
  inOrder,
  fifo,
} = require('./algorithm.js');

var tree = (new Tree(30))
  .insert(20)
    .insert(10)
    .insert(25)
  .insert(40)
    .insert(35)
    .insert(50);

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

test('MAX -> should return the maximum element in the tree', t => {
  var fakeBstNode = {
    data:30,
    left:{data:20,left:{data:10},right:{data:25}},
    right:{data:40,left:{data:35},right:{data:50}},
  };
  t.equal(findMax(fakeBstNode).data,50,'got 50 which is MAX');
  t.end();
});

test('MIN -> should return the minimum element in the tree', t => {
  var fakeBstNode = {
    data:30,
    left:{data:20,left:{data:10},right:{data:25}},
    right:{data:40,left:{data:35},right:{data:50}},
  };
  t.equal(findMin(fakeBstNode).data,10,'got 10 which is MIN');
  t.end();
});

test('FIND-HEIGHT -> should return the height of the tree', t => {
  var fakeBstNode = {
    data:30,
    left:{data:20,left:{data:10},right:{data:25}},
    right:{data:40,left:{data:35},right:{data:50}},
  };
  t.equal(findHeight(fakeBstNode),2,'got 2 which is correct');
  t.end();
});

test('LEFT ROTATION -> rotate left', t => {

  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
      .insert(25)
    .insert(40)
      .insert(35)
      .insert(50);

  var result = JSON.parse(JSON.stringify(
    leftRotate(shortTree.root)
  ));

  t.ok(deepEqual(result,{
    "data":40,
    "left":{
      "data":30,
      "left":{"data":20,"left":{"data":10},"right":{"data":25}},
      "right":{"data":35}
    },
    "right":{"data":50}
  }),'got right tree');
  t.end();
});

test('RIGHT ROTATION -> rotate right', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
      .insert(25)
    .insert(40)
      .insert(35)
      .insert(50);

  var result = JSON.parse(JSON.stringify(
    rightRotate(shortTree.root)
  ));

  t.ok(deepEqual(result,{
    'data':20,
    'left':{'data':10},
    'right':{
      'data':30,
      'left':{'data':25},
      'right':{
        'data':40,
        'left':{'data':35},
        'right':{'data':50}
      }
    }
  }),'got right tree');
  t.end();
});

test('TREE TO VINE -> should return a sorted linked list', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
      .insert(25)
    .insert(40)
      .insert(35)
      .insert(50);

  var result = JSON.parse(JSON.stringify(
    treeToVine(shortTree.root)
  ));

  t.ok(deepEqual(result,{
    "data":10,
    "right":{
      "data":20,
      "right":{
        "data":25,
        "right":{
          "data":30,
          "right":{
            "data":35,
            "right":{
              "data":40,
              "right":{
                "data":50
  }}}}}}}),'got a vine');
  t.end();
});

test('BALANCE TREE -> balance an unbalanced tree', t => {
  var right = (new Tree(10)).insert(20).insert(25).insert(30).insert(35).insert(40).insert(50);
  var left  = (new Tree(50)).insert(40).insert(35).insert(30).insert(25).insert(20).insert(10);

  var resRight = JSON.parse(JSON.stringify(
    balanceTree(right.root)
  ));

  var resLeft = JSON.parse(JSON.stringify(
    balanceTree(left.root)
  ));

  t.ok(deepEqual(resRight,{
    "data":30,
    "right":{
      "data":40,
      "right":{"data":50},
      "left":{"data":35}
    },
    "left":{
      "data":20,
      "right":{"data":25},
      "left":{"data":10}
    }
  }),'from RIGHT UNBALANCED got a full balanced tree');

  t.ok(deepEqual(resLeft,{
    "data":30,
    "right":{
      "data":40,
      "right":{"data":50},
      "left":{"data":35}
    },
    "left":{
      "data":20,
      "right":{"data":25},
      "left":{"data":10}
    }
  }),'from LEFT UNBALANCED got a full balanced tree');
  t.end();
});

test.init();