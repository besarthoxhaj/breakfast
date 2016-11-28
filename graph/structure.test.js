'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var {Node,Edge,Graph} = require('./structure.js');

test('Graph -> insert NODE', t => {
  var graph = new Graph();
  graph.insertNode('A').insertNode('B').insertNode('C').insertNode('D');
  graph.insertEdge('A','B').insertEdge('C','B').insertEdge('A','C').insertEdge('B','D');
  t.ok(deepEqual(graph.print(),{
    'nodes':['A','B','C','D'],
    'edges':{'A':['B','C'],'B':['A','C','D'],'C':['A','B'],'D':['B']}
  }),'got right graph');
  t.end();
});

test('Graph -> delete NODE', t => {
  var graph = new Graph();
  graph.insertNode('A').insertNode('B').insertNode('C').insertNode('D');
  graph.insertEdge('A','B').insertEdge('C','B').insertEdge('A','C').insertEdge('B','D');
  graph.removeNode('B');
  t.ok(deepEqual(graph.print(),{
    'nodes':['A','C','D'],
    'edges':{'A':['C'],'C':['A'],'D':[]}
  }),'got right graph');
  t.end();
});

test('Graph -> delete EDGE', t => {
  var graph = new Graph();
  graph.insertNode('A').insertNode('B').insertNode('C').insertNode('D');
  graph.insertEdge('A','B').insertEdge('C','B').insertEdge('A','C').insertEdge('B','D');
  graph.removeEdge('B','A');
  t.ok(deepEqual(graph.print(),{
    'nodes':['A','B','C','D'],
    'edges':{'A':['C'],'B':['C','D'],'C':['A','B'],'D':['B']}
  }),'got right graph');
  t.end();
});

test.init();