'use strict';

var test = require('../../tape/index.js');
var excel = require('../src/utils');

test('Excel:infixToPostfix', function(t) {
  var result = excel.infixToPostfix('(3 + 9) * 2');
  t.deepEqual(result, ['3','9','+','2','*'], `(3 + 9) * 2 => ['3','9','+','2','*']`);
  t.end();
});

test('Excel:evaluatePostfixExpression', function(t) {
  var result = excel.evaluatePostfixExpression(['3','9','+','2','*']);
  t.equal(result, 24, `['3','9','+','2','*'] => 24`);
  t.end();
});

test.init();
