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

// routine tree-to-vine(root)
//     // Convert tree to a "vine", i.e., a sorted linked list,
//     // using the right pointers to point to the next node in the list
//     tail ← root
//     rest ← tail.right
//     while rest ≠ nil
//         if rest.left = nil
//             tail ← rest
//             rest ← rest.right
//         else
//             temp ← rest.left
//             rest.left ← temp.right
//             temp.right ← rest
//             rest ← temp
//             tail.right ← temp

var leftRotate = function(root) {
  if(root.right !== undefined) {
    var pivot = root.right;
    root.right = pivot.left;
    pivot.left = root;
    root = pivot.left;
    root = pivot;
  }

  return root;
};

var rightRotate = function(root) {
  if(root.left !== undefined) {
    var pivot = root.left;
    root.left = pivot.right;
    pivot.right = root;
    root = pivot.right;
    root = pivot;
  }

  return root;
};

var treeToVine = function(root) {

  while(root.left !== undefined) {
    root = rightRotate(root);
  }

  if(root.right !== undefined) {
    root.right = treeToVine(root.right);
  }

  return root;
};

var countNodes = function(root) {

  var ii = 0;
  var currentNode = treeToVine(JSON.parse(JSON.stringify(root)));

  while(currentNode.right !== undefined) {
    currentNode = currentNode.right;
    ii++;
  }

  return ii;
};

var balanceTree = function(root) {

  if(root === undefined) return;
  var root = treeToVine(root);

  return (function balance(rootNode) {
    if(rootNode === undefined) return undefined;
    var currentNode = rootNode;
    while(
      Math.abs(
        findHeight(currentNode.left) - findHeight(currentNode.right)
      ) > 1
    ) {
      var isLeft = (findHeight(currentNode.left) - findHeight(currentNode.right)) > 1;
      var isRight = (findHeight(currentNode.right) - findHeight(currentNode.left)) > 1;
      if(isLeft) {
        currentNode = rightRotate(currentNode);
      } else {
        currentNode = leftRotate(currentNode);
      }
    }
    if(
      Math.max(findHeight(currentNode.left) + 1,findHeight(currentNode.right) + 1) 
      >
      Math.log2(countNodes(currentNode))
    ) {
      currentNode.right = balance(currentNode.right);
      currentNode.left = balance(currentNode.left);
    }
    return currentNode;
  }(root));
};

if (typeof module === 'object' && module.exports) {
  module.exports = {
    isBinarySearchTree,
    balanceTree,
    rightRotate,
    leftRotate,
    findHeight,
    treeToVine,
    postOrder,
    preOrder,
    findMax,
    findMin,
    inOrder,
    fifo,
  };
}
