'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Node,Tree} = require('./structure.js');
var {
  isBinarySearchTree
} = require('./algorithm.js');

test('Node', t => {
  var node = new Node(10);
  t.equal(node.data,10,'got right data');
  t.equal(node.left,undefined,'got no left node');
  t.equal(node.right,undefined,'got no right node');
  t.end();
});

test('Tree -> insertion', t => {
  var tree = new Tree(30);
  tree.insert(20);
  tree.insert(40);
  tree.insert(25);
  tree.insert(35);
  var jsonTree = JSON.parse(JSON.stringify(tree));
  t.ok(deepEqual(jsonTree,{
    root:{
      data:30,
      left:{data:20,right:{data:25}},
      right:{data:40,left:{data:35}}
    }
  }),'got right tree');
  t.end();
});

test('Tree -> search', t => {
  var tree = new Tree(30);
  tree.insert(20);tree.insert(40);
  tree.insert(25);tree.insert(35);
  tree.insert(10);tree.insert(50);
  t.ok(tree.search(10),'tree found 10');
  t.notOk(tree.search(15),'tree did not found 15');
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
  shortTree.deleteNode(10);
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
  shortTree.deleteNode(10);
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
  shortTree.deleteNode(10);
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
  shortTree.deleteNode(20);
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
  shortTree.deleteNode(40);
  t.ok(deepEqual(JSON.parse(JSON.stringify(shortTree.root)),{
    data:30,
    left:{data:20,left:{data:10,left:{data:9},right:{data:11}},right:{data:25,left:{data:24},right:{data:26}}},
    right:{data:50,left:{data:49,left:{data:35,left:{data:34},right:{data:36}}},right:{data:51}}
  }),'node got deleted');
  t.ok(isBinarySearchTree(shortTree.root),'is BST after deletion');
  t.end();
});

test.init();