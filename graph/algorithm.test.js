'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {traverseDfs,traverseBfs,findPathFromTo} = require('./algorithm.js');
var {Node,Edge,Graph} = require('./structure.js');

test('Algorithm -> traverse Depth-First search', t => {
  var graph = new Graph();
  graph.insertNode('A').insertNode('B').insertNode('C').insertNode('D')
    .insertNode('E').insertNode('F').insertNode('G').insertNode('H');

  graph.insertEdge('A','B').insertEdge('A','F').insertEdge('A','D').insertEdge('A','G')
    .insertEdge('B','E').insertEdge('B','F')
    .insertEdge('E','G')
    .insertEdge('F','C')
    .insertEdge('H','C');

  t.ok(deepEqual(
    traverseDfs(graph),['A','B','E','G','F','C','H','D']),
    'correctly traversed the graph'
  );
  t.end();
});

test('Algorithm -> traverse Breadth-Frist search', t => {
  var graph = new Graph();
  graph.insertNode('A').insertNode('B').insertNode('C').insertNode('D')
    .insertNode('E').insertNode('F').insertNode('G').insertNode('H');

  graph.insertEdge('A','B').insertEdge('A','D').insertEdge('A','G')
    .insertEdge('B','E').insertEdge('B','F')
    .insertEdge('E','G')
    .insertEdge('F','C')
    .insertEdge('H','C');

  t.ok(deepEqual(
    traverseBfs(graph),['A','B','D','G','E','F','C','H']),
    'correctly traversed the graph'
  );
  t.end();
});

test.init();