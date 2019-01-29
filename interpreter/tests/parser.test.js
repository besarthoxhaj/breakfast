'use strict';
/* @flow */

var test = require('../../tape/index.js');
var deepEqual = require('../../deep-equal/index.js');
var parser = require('../parser.js');

test('Parser -> skipSpace', t => {
  t.equal(parser.skipSpace(' hello'), 'hello', 'removed spaces');
  t.end();
});

test('Parser -> parseExpression -> basic expressions', t => {

  t.ok(deepEqual(
    parser.parseExpression("99"),
    {"expr": {"type": "value", "value": 99}, "rest": ""}
  ));

  t.ok(deepEqual(
    parser.parseExpression("hello"),
    {"expr": {"type": "word", "name": "hello"}, "rest": ""}
  ));

  t.ok(deepEqual(
    parser.parseExpression("\"string\""),
    {"expr": {"type": "value", "value": "string"}, "rest":""}
  ));

  t.ok(deepEqual(
    parser.parseExpression("5 5"),
    {"expr": {"type": "value", "value": 5}, "rest": "5"}
  ));

  try {
    parser.parseExpression("()");
  } catch (e) {
    t.equal(e.message, 'Unexpected syntax: ()');
  }

  t.end();
});

test('Parser -> parseExpression -> "apply" expressions', t => {

  try {
    parser.parseExpression("foo(5 5)");
  } catch (e) {
    t.equal(e.message, "Expected ',' or ')'");
  }

  t.ok(deepEqual(
    parser.parseExpression("foo(5, 5)"),{
    "expr": {
      "type": "apply",
      "operator": {"type": "word", "name": "foo"},
      "args":[
        {"type": "value", "value": 5},
        {"type": "value","value": 5}
      ]
    },
    "rest": ""
  }));

  t.end();
});

test('Parser -> parse', t => {

  t.ok(deepEqual(parser.parse('+(a, 5)'), {
    "type":"apply",
    "operator": {"type": "word", "name": "+"},
    "args":[
      {"type": "word", "name": "a"},
      {"type": "value", "value": 5}
    ]
  }));

  t.end();
});

test.init();
