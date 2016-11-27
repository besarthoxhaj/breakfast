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

/**
 * [isBinarySearchTree description]
 * @return {Boolean} [description]
 */
var isBinarySearchTree = function(node) {
  return (function checkBst(currentNode,minValue,maxValue) {
    if(currentNode === undefined) return true;
    if(currentNode.data > minValue && currentNode.data < maxValue
      && checkBst(currentNode.left,minValue,currentNode.data)
      && checkBst(currentNode.right,currentNode.data,maxValue)
    ) {
      return true;
    } else {
      return false;
    }
  }(node,-Infinity,Infinity));
};

/**
 * 
 */
var findMax = function(node) {
  // while loop through the RIGHT elements
  // of the tree and keep looping until
  // an null or undefined is found
  var currentNode = node;
  while (currentNode.right !== undefined) {
    currentNode = currentNode.right;
  }
  return currentNode;
};

/**
 * 
 */
var findMin = function(node) {
  // while loop through the LEFT elements
  // of the tree and keep looping until
  // an null or undefined is found
  var currentNode = node;
  while (currentNode.left !== undefined) {
    currentNode = currentNode.left;
  }
  return currentNode;
};

/**
 * 
 */
var findHeight = function(node) {
  // find height of the LEFT subtree
  // find height of the RIGHT subtree
  // get the MAX of them
  // add +1 and thats the height
  if(node === undefined) return -1;
  var leftHeight = findHeight(node.left);
  var rightHeight = findHeight(node.right);
  return (leftHeight < rightHeight ? rightHeight : leftHeight) + 1;
};

/**
 * [deleteNode description]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
 var deleteNode = function(nodeRoot,nodeValue) {

   var parentNode = undefined;
   var currentNode = nodeRoot;

   while(currentNode !== undefined) {
     if(currentNode.data > nodeValue) {
       parentNode = currentNode;
       currentNode = currentNode.left;
     } else if(currentNode.data < nodeValue) {
       parentNode = currentNode;
       currentNode = currentNode.right;
     } else {
       break;
     }
   }

   // NO CHILD
   // check if node is a leaf, if so
   // delete the reference from the
   // parent after finding if the
   // currentNode is on the left or
   // on the right
   if(currentNode.left === undefined && currentNode.right === undefined) {
     if(currentNode.data > parentNode.data) {
       delete parentNode.right;
     } else {
       delete parentNode.left;
     }
     return;
   }

   // ONE CHILD - RIGHT
   // if the node has only the right child
   // assign the value of the right child
   // of the currentNode node to the right
   // or left child of the parentNode
   if(currentNode.left === undefined && currentNode.right !== undefined) {
     if(currentNode.data > parentNode.data) {
        parentNode.right = currentNode.right;
      } else {
        parentNode.left = currentNode.right;
      }
      return;
   }

   // ONE CHILD - LEFT
   if(currentNode.left !== undefined && currentNode.right === undefined) {
     if(currentNode.data > parentNode.data) {
        parentNode.right = currentNode.left;
      } else {
        parentNode.left = currentNode.left;
      }
      return;
   }

   // TWO CHILD - case LEFT
  //  if(currentNode.data < parentNode.data) {
  //    parentNode.left = currentNode.left;
  //  } else {
  //    parentNode.right = currentNode.left;
  //  }
  //  var maxNode = findMax(currentNode.left);
  //  maxNode.right = currentNode.right;

   // TWO CHILD - case RIGHT
   if(currentNode.data < parentNode.data) {
     parentNode.left = currentNode.right;
   } else {
     parentNode.right = currentNode.right;
   }
   var minNode = findMin(currentNode.right);
   minNode.left = currentNode.left;
 };

if (typeof module === 'object' && module.exports) {
  module.exports = {
    isBinarySearchTree,
    findHeight,
    deleteNode,
    postOrder,
    preOrder,
    findMax,
    findMin,
    inOrder,
    fifo,
  };
}
