'use strict';

class Tree {
  /**
   *
   *
   */
  constructor() {

    this.nodes = [];
    this.edges = {};
  }
  /**
   *
   *
   */
  insertNode(value) {

    this.nodes.push(value);
    return this;
  }
  /**
   *
   *
   */
  insertEdge(from, to) {

    this.edges[from] = (this.edges[from] || []).concat(to);
    return this;
  }
}

var myTree = new Tree();

myTree
  .insertNode('a')
  .insertNode('b')
  .insertNode('c')
  .insertNode('d')
  .insertNode('e')
  .insertNode('f')
  .insertNode('g')
  .insertNode('h')
;

myTree
  .insertEdge('a', 'b')
  .insertEdge('a', 'c')
  .insertEdge('b', 'd')
  .insertEdge('b', 'e')
  .insertEdge('b', 'f')
  .insertEdge('c', 'g')
  .insertEdge('g', 'h')
  .insertEdge('f', 'c')
  // .insertEdge('h', 'f')
;

/**
 *
 *
 */
function dfs(tree, value) {

  var stack = [];
  var visited = [];

  stack.push(tree.nodes[0]);

  while(stack.length !== 0) {

    // var currentNode = stack.pop();
    var currentNode = stack.shift();
    var currentEdges = tree.edges[currentNode] || [];

    currentEdges.forEach(node => {
      stack.push(node);
    });

    visited.push(currentNode);

    if (currentNode === value) {
      return {
        value: currentNode,
        edges: currentEdges
      };
    }
  }

  return visited;
}

console.log(
  dfs(myTree)
);
