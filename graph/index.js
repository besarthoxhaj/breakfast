'use strict';
/* @flow */

/**
 * Edge list
 */

class Edge {
  construct(start,end) {
    this.start = start;
    this.end = end;
  }
}

var vertexList = ['A','B','C','D','E','F'];
var edgeList = [
  new Edge('A','B'),
  new Edge('A','C'),
  new Edge('A','D'),
  new Edge('B','F'),
  new Edge('C','F'),
  new Edge('D','E'),
  new Edge('E','F'),
];

if (typeof module === 'object' && module.exports) {
  module.exports = Edge;
}