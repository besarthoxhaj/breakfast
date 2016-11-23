'use strict';
/* @flow */

class Node {
  constructor(data) {
    this.data = data;
    this.next = undefined;
  }
}

class SinglyList {
  constructor() {
    this.length = 0;
    this.head = undefined;
  }
  insert(value) {
    var newNode = new Node(value);
    this.length = this.length + 1;
    if(this.head === undefined) {
      this.head = newNode;
      return;
    }

    this.getLastNode(this.head).next = newNode;
  }
  getLastNode(checkNode) {
    if(checkNode.next === undefined) {
      return checkNode;
    }
    return this.getLastNode(checkNode.next);
  }
  getNodeAt(idx) {
    if(idx > this.length) {
      return -1;
    }

    if(idx === 0) {
      return this.head.data;
    }

    if(idx === this.length - 1) {
      return this.getLastNode.data;
    }

    var currentIdx = 0;
    var currentNode = this.head;

    while(currentIdx !== idx) {
      currentNode = currentNode.next;
      currentIdx++;
    }

    return currentNode;
  }
  getAt(idx) {
    return this.getNodeAt(idx).data;
  }
  insertAt(idx,data) {
    var nodeIdx;

    if(idx === 0 || idx === 1) {
      nodeIdx = this.head;
    } else {
      nodeIdx = this.getNodeAt(idx - 1);
    }

    var newNode = new Node(data);
    var oldNode = nodeIdx.next;
    nodeIdx.next = newNode;
    newNode.next = oldNode;
    this.length = this.length + 1;
  }
}

module.exports = {
  Node,
  SinglyList,
};