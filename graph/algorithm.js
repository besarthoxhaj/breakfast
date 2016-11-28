'use strict';
/* @flow */

var Stack = require('../stack/index.js');
var Queue = require('../queue/index.js');

/**
 * Depth-First Search requires a stack
 * since uses a LIFO algorithm.
 * @param  {[type]} graph [description]
 * @return {[type]}       [description]
 */
var traverseDfs = function(graphRoot) {
  var stack = new Stack();
  var visited = [];
  stack.push(graphRoot.nodes[0]);
  visited.push(graphRoot.nodes[0]);

  // look at the top of the stack
  // get the first unvisited element
  // and visit in alphabetical order
  // its neighborhoods
  while(!stack.isEmpty()) {
    var topStack = stack.getTop();
    var edges = graphRoot.edges[topStack];
    var unvisited = [];
    for(var ii = 0; ii < edges.length; ii++) {

      if(visited.indexOf(edges[ii]) === -1) {
        unvisited.push(edges[ii]);
      }
    }
    if(unvisited.length === 0) {
      stack.pop();
    } else {
      stack.push(unvisited[0]);
      visited.push(unvisited[0]);
    }
  }

  return visited;
};

/**
 * [traverseBfs description]
 * @param  {[type]} graphRoot [description]
 * @return {[type]}           [description]
 */
var traverseBfs = function(graphRoot,processFn) {
  var Q = new Queue();
  var visited = [];

  Q.insert(graphRoot.nodes[0]);
  visited.push(graphRoot.nodes[0]);

  while (!Q.isEmpty()) {
    var frontQueue = Q.remove();
    var edges = graphRoot.edges[frontQueue];
    for(var ii = 0; ii < edges.length; ii++) {
      if(visited.indexOf(edges[ii]) === -1) {
        visited.push(edges[ii]);
        Q.insert(edges[ii]);
      }
    }
  }

  return visited;
};

/**
 * Implementation of Dijkstra’s algorithm.
 * @param  {[type]} graph [description]
 * @param  {[type]} A     [description]
 * @param  {[type]} B     [description]
 * @return {[type]}       [description]
 */
var findPathFromTo = function(graphRoot,A,B) {

  // start from the fist node
  var Q = new Queue();
  var visited = [];
  var table = {};

  Q.insert(graphRoot.nodes[0]);
  visited.push(graphRoot.nodes[0]);

  while (!Q.isEmpty()) {
    var frontQueue = Q.remove();
    var edges = graphRoot.edges[frontQueue];
    for(var ii = 0; ii < edges.length; ii++) {
      if(visited.indexOf(edges[ii]) === -1) {
        visited.push(edges[ii]);
        Q.insert(edges[ii]);
        // save from where we came
        table[edges[ii]] = frontQueue;
      }
    }
  }

  var path = [B];

  while(path[path.length - 1] !== A) {
    path.push(table[path[path.length - 1]]);
  }

  return path.reverse();
};

if (typeof module === 'object' && module.exports) {
  module.exports = {
    findPathFromTo,
    traverseDfs,
    traverseBfs,
  };
}