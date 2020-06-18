'use strict';

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var Binary = require('./binary.js');

test('Binary -> addition', t => {

  const currBin = new Binary('0001');
  const resultOne = currBin.addition('0001');
  const resultTwo = currBin.addition('0001');
  const resultFoo = currBin.addition('0001');
  t.equal(resultOne, '0010', '0001 + 0001 = 0010');
  t.equal(resultTwo, '0011', '0010 + 0001 = 0011');
  t.equal(resultFoo, '0100', '0011 + 0001 = 0100');
  t.end();
});

test.init();