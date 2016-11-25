'use strict';
/* @flow */

var Queue = require('../queue/index.js');

/**
 * FIFO - First In First Out
 * Uses a queue system to traverse a tree.
 * @param  {Node} rootNode inital node
 * @return {Void}
 */
var fifo = function(rootNode) {
  var store = [];
  var Q = (new Queue()).insert(rootNode);

  // If Q is empty and node does not have child, exit.
  // If Q is not empty but node got child.
  // Push child, first left than right, of node to queue.
  // Print node, repeat.
  // If Q is not empty get first element (FE).
  // Push child, first left than right, of FE to queue.
  // Print FE and pop it from the queue.
  // Repeat.

  while(!Q.isEmpty()) {
    var nextElm = Q.getFront();
    if(nextElm.left !== undefined) {
      Q.insert(nextElm.left);
    }
    if(nextElm.right) {
      Q.insert(nextElm.right);
    }
    store.push(nextElm.data);
    Q.remove();
  }

  return store;
};

/**
 * LIFO - Last In First Out
 * Uses computer stack to keep elements
 * in order. Preorder means:
 * <root><left><right>
 * So the data must be visited first.
 * @return {[type]} [description]
 */
var preOrder = function(node) {
  var store = [];
  (function selfPreOrder(currentNode) {
    if(currentNode === undefined) return;
    store.push(currentNode.data);
    selfPreOrder(currentNode.left);
    selfPreOrder(currentNode.right);
  }(node));
  return store;
};

/**
 * [inOrder description]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
var inOrder = function(node) {
  var store = [];
  (function selfPreOrder(currentNode) {
    if(currentNode === undefined) return;
    selfPreOrder(currentNode.left);
    store.push(currentNode.data);
    selfPreOrder(currentNode.right);
  }(node));
  return store;
};

/**
 * [postOrder description]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
var postOrder = function(node) {
  var store = [];
  (function selfPreOrder(currentNode) {
    if(currentNode === undefined) return;
    selfPreOrder(currentNode.left);
    selfPreOrder(currentNode.right);
    store.push(currentNode.data);
  }(node));
  return store;
};

if (typeof module === 'object' && module.exports) {
  module.exports = {
    postOrder,
    preOrder,
    inOrder,
    fifo,
  };
}
