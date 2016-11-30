'use strict';
/* @flow */

var {findMin} = require('./algorithm.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = undefined;
    this.right = undefined;
  }
}

class Tree {
  constructor(data) {
    this.root = new Node(data);
    // What happens if I return `this`?
  }
  print() {
    return JSON.parse(JSON.stringify(this.root));
  }
  insert(data) {

    var newNode = new Node(data);
    var currentNode = this.root;

    while(currentNode !== undefined) {
      if(data <= currentNode.data) {
        if(currentNode.left === undefined) {
          currentNode.left = newNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === undefined) {
          currentNode.right = newNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return this;
  }
  search(data) {
    var currentNode = this.root;
    while (currentNode !== undefined) {
      if(data === currentNode.data) {
        return true;
      } else if(data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }
  deleteNode(nodeValue) {
    var parentNode = undefined;
    var currentNode = this.root;

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
  }
}

if (typeof module === 'object' && module.exports) {
  module.exports = {
    Node,
    Tree,
  };
}