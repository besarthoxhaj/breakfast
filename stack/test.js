'use strict';
/* @flow */

var test = require('../tape/index.js');
var Stack = require('./index.js');

test('Stack -> push and pop element', t => {
  var myStack = new Stack();
  myStack.push(0);
  myStack.push(1);
  myStack.push(2);
  t.equal(myStack.size,3,'stack size is 3');
  t.equal(myStack.pop(),2,'pop from stack return 2');
  t.equal(myStack.size,2,'stack size is 2');
  myStack.pop();
  myStack.pop();
  myStack.pop();
  myStack.pop();
  t.equal(myStack.pop(),undefined,'pop from empty stack return undefined');
  t.equal(myStack.size,0,'empty stack size is 0');
  t.end();
});

test.init();