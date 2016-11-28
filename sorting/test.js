'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');

var selectionSort = require('./selection.js');

test('Sortring -> selection', t => {
  console.log('selectionSort',selectionSort);
  t.end();
});

test.init();