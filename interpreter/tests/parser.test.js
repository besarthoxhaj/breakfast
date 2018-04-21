'use strict';
/* @flow */

var test = require('../../tape/index.js');
var deepEqual = require('../../deep-equal/index.js');
var parser = require('../parser.js');

test('Parser -> skipSpace', t => {
  t.equal(parser.skipSpace(' hello'), 'hello', 'removed spaces');
  t.end();
});

test('Parser -> parseExpression', t => {

  var example_01 = parser.parseExpression("hello");
  var example_02 = parser.parseExpression("boom()");
  var example_02 = parser.parseExpression("do(print('hello'))");

  console.log(`example_01`,example_01);
  console.log(`example_02`,example_02);
  // t.ok(deepEqual(
  //   parser.parseExpression("do"),
  //   {}
  // ),'correct AST');

  t.end();
});

test.init();
