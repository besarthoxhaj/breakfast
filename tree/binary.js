'use strict';
/* @flow */

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
  }
  insert(data) {

    var newNode = new Node(data);
    var currentNode = this.root;

    while(currentNode !== undefined) {
      if(data <= currentNode.data) {
        if(currentNode.left === undefined) {
          return currentNode.left = newNode;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === undefined) {
          return currentNode.right = newNode;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
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
}

if (typeof module === 'object' && module.exports) {
  module.exports = {
    Node,
    Tree,
  };
}