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
  t.equal(myStack.getTop(),1,'got right top of the stack');
  t.equal(myStack.isEmpty(),false,'stack is not empty yet');
  myStack.pop();
  myStack.pop();
  myStack.pop();
  myStack.pop();
  t.equal(myStack.pop(),undefined,'pop from empty stack return undefined');
  t.equal(myStack.size,0,'empty stack size is 0');
  t.equal(myStack.isEmpty(),true,'stack is empty');
  t.end();
});

test.init();