'use strict';
/* @flow */

var test = require('./index.js');

test('ONE', t => {
  t.equal(1,1,'_');
  setTimeout(() => {
    t.equal(2,2,'__');
    t.end();
  });
});

test('TWO', t => {
  t.equal(3,3,'___');
});

test.init();
