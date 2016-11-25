'use strict';
/* @flow */

class Queue {
  constructor() {
    this.front = -1;
    this.rear = -1;
    this.store = {};
  }
  insert(data) {
    if(this.isEmpty()) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.rear = this.rear + 1;
    }
    this.store[this.rear] = data;
  }
  isEmpty() {
    return this.front === -1 || this.rear === -1;
  }
  getFront() {
    return this.store[this.front];
  }
  getSize() {
    return (this.rear - this.front) + 1;
  }
  remove() {
    var first = this.store[++this.front];
    if(first === undefined) {
      this.front = -1;
      this.rear = -1;
    }
    return first;
  }
}

if (typeof module === 'object' && module.exports) {
  module.exports = Queue;
}