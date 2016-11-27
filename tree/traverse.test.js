'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Tree,Node} = require('./binary.js');
var {
  isBinarySearchTree,
  findHeight,
  deleteNode,
  postOrder,
  preOrder,
  findMax,
  findMin,
  inOrder,
  fifo,
} = require('./traverse.js');

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

test('DELETE -> delete a LEAF node', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
      .insert(25)
    .insert(40)
      .insert(35)
      .insert(50);
  t.ok(isBinarySearchTree(shortTree.root),'is BST');
  deleteNode(shortTree.root,10);
  t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
    data:30,
      left:{data:20,right:{data:25}},
      right:{data:40,left:{data:35},right:{data:50}}
  }),'node got deleted');
  t.end();
});

test('DELETE -> delete node with ONE CHILD on the RIGHT', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
        .insert(15)
      .insert(25)
    .insert(40)
      .insert(35)
      .insert(50);
  t.ok(isBinarySearchTree(shortTree.root),'is BST before deletion');
  deleteNode(shortTree.root,10);
  t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
    data:30,
      left:{data:20,left:{data:15},right:{data:25}},
      right:{data:40,left:{data:35},right:{data:50}}
  }),'node got deleted');
  t.ok(isBinarySearchTree(shortTree.root),'is BST after deletion');
  t.end();
});

test('DELETE -> delete node with ONE CHILD on the LEFT', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
        .insert(5)
      .insert(25)
    .insert(40)
      .insert(35)
      .insert(50);
  t.ok(isBinarySearchTree(shortTree.root),'is BST before deletion');
  deleteNode(shortTree.root,10);
  t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
    data:30,
    left:{data:20,left:{data:5},right:{data:25}},
    right:{data:40,left:{data:35},right:{data:50}}
  }),'node got deleted');
  t.ok(isBinarySearchTree(shortTree.root),'is BST after deletion');
  t.end();
});

// test('DELETE -> delete node with TWO CHILD and SUBSTITUTE the LEFT', t => {
//   var shortTree = (new Tree(30))
//     .insert(20)
//       .insert(10)
//         .insert(9)
//         .insert(11)
//       .insert(25)
//         .insert(24)
//         .insert(26)
//     .insert(40)
//       .insert(35)
//       .insert(50);
//   t.ok(isBinarySearchTree(shortTree.root),'is BST before deletion');
//   deleteNode(shortTree.root,20);
//   t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
//     data:30,
//     left:{
//       data:10,
//       left:{
//         data:9
//       },
//       right:{
//         data:11,
//         right:{data:25,left:{data:24},right:{data:26}}
//       }
//     },
//     right:{
//       data:40,
//       left:{data:35},
//       right:{data:50}
//     }
//   }),'node got deleted');
//   t.ok(isBinarySearchTree(shortTree.root),'is BST after deletion');
//   t.end();
// });

test('DELETE -> delete node with TWO CHILD and SUBSTITUTE the RIGHT', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
        .insert(9)
        .insert(11)
      .insert(25)
        .insert(24)
        .insert(26)
    .insert(40)
      .insert(35)
      .insert(50);
  t.ok(isBinarySearchTree(shortTree.root),'is BST before deletion');
  deleteNode(shortTree.root,20);
  t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
    data:30,
    left:{
      data:25,
      left:{data:24,left:{data:10,left:{data:9},right:{data:11}}},
      right:{data:26}
    },
    right:{data:40,left:{data:35},right:{data:50}}
  }),'node got deleted');
  t.ok(isBinarySearchTree(shortTree.root),'is BST after deletion');
  t.end();
});

test('DELETE -> delete node with TWO CHILD and SUBSTITUTE the RIGHT', t => {
  var shortTree = (new Tree(30))
    .insert(20)
      .insert(10)
        .insert(9)
        .insert(11)
      .insert(25)
        .insert(24)
        .insert(26)
    .insert(40)
      .insert(35)
        .insert(34)
        .insert(36)
      .insert(50)
        .insert(49)
        .insert(51);
  t.ok(isBinarySearchTree(shortTree.root),'is BST before deletion');
  deleteNode(shortTree.root,40);
  t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
    data:30,
    left:{data:20,left:{data:10,left:{data:9},right:{data:11}},right:{data:25,left:{data:24},right:{data:26}}},
    right:{data:50,left:{data:49,left:{data:35,left:{data:34},right:{data:36}}},right:{data:51}}
  }),'node got deleted');
  t.ok(isBinarySearchTree(shortTree.root),'is BST after deletion');
  t.end();
});

test.init();