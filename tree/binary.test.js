'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Node,Tree} = require('./binary.js');

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

test.init();