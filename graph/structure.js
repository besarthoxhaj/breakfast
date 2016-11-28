'use strict';
/* @flow */

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }
  insertNode(data) {
    if(this.nodes.indexOf(data) !== -1) {
      console.log('CAN NOT INSERT TWO IDENTICAL NODES');
      return;
    }
    this.nodes.push(data);
    this.edges[data] = [];
    return this;
  }
  insertEdge(A,B) {

    if(this.nodes.indexOf(A) === -1 || this.nodes.indexOf(B) === -1) {
      console.log('ONE OR MORE NODES WAS NOT FOUND!');
      return;
    }

    this.edges[A].push(B);
    this.edges[B].push(A);

    // make sure they are in
    // alphabetical order
    this.edges[A].sort();
    this.edges[B].sort();

    return this;
  }
  removeNode(node) {

    if(this.nodes.indexOf(node) === -1) {
      console.log('NODE WAS NOT FOUND!');
      return;
    }

    var edgesOfDeleteNode = this.edges[node];
    for(var ii = 0; ii < edgesOfDeleteNode.length; ii++) {
      this.edges[edgesOfDeleteNode[ii]].splice(this.edges[edgesOfDeleteNode[ii]].indexOf(node),1);
    }

    delete this.edges[node];
    this.nodes.splice(this.nodes.indexOf(node),1);
    return this;
  }
  removeEdge(A,B) {
    // make sure the edge exists
    // check if A got a reference to B
    // and check if B got the same to A
    if(this.edges[A].indexOf(B) === -1 || this.edges[B].indexOf(A) === -1) {
      console.log('SOMETHING WRONG!');
      return;
    }

    // delete reference from A
    this.edges[A].splice(this.edges[A].indexOf(B),1);
    this.edges[B].splice(this.edges[B].indexOf(A),1);

    return this;
  }
  print() {
    return JSON.parse(JSON.stringify(this));
  }
}

if (typeof module === 'object' && module.exports) {
  module.exports = {Graph};
}