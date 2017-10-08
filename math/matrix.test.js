'use strict';
/* @flow */

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');
var matrix = require('./matrix.js');

test('Matrix -> pipe', t => {

  var addOneTimesTwo = matrix.pipe(
    (n) => n + 1,
    (n) => n * 2,
  );

  t.equal(addOneTimesTwo(1),4,'correct order');
  t.end();
});

test('Matrix -> transpose -> NxN', t => {
  var A = [
    [1,2,3],
    [1,2,3],
    [1,2,3]
  ];
  var res = matrix.transpose(A);
  t.ok(deepEqual(res,[
    [1,1,1],
    [2,2,2],
    [3,3,3],
  ]),'transpose NxN correctly');
  var res2 = matrix.transpose(res);
  t.ok(deepEqual(res2,A),'transpose twice');
  t.end();
});

test('Matrix -> transpose -> MxN', t => {
  var res = matrix.transpose([
    [1,2],
    [1,2],
    [1,2]
  ]);
  t.ok(deepEqual(res,[
    [1,1,1],
    [2,2,2]
  ]),'transpose MxN correctly');
  t.end();
});

test('Matrix -> addition -> NxN', t => {

  const _2x2 = matrix.add(
    [
      [1,2],
      [1,2]
    ],
    [
      [2,3],
      [3,1]
    ]
  );

  const _3x3 = matrix.add(
    [
      [3,2,1],
      [2,1,2],
      [1,2,3]
    ],
    [
      [3,1,2],
      [1,2,1],
      [2,1,3]
    ]
  );

  t.ok(deepEqual(_2x2,[
    [3,5],
    [4,3]
  ]),'add 2x2 correctly');

  t.ok(deepEqual(_3x3,[
    [6,3,3],
    [3,3,3],
    [3,3,6]
  ]),'add 3x3 correctly');
  t.end();
});

test('Matrix -> addition -> MxN', t => {

  const _3x2 = matrix.add(
    [
      [1,2,1],
      [1,2,2]
    ],
    [
      [2,3,0],
      [3,1,4]
    ]
  );

  t.ok(deepEqual(_3x2,[
    [3,5,1],
    [4,3,6]
  ]),'add 3x2 correctly');

  t.end();
});

test('Matrix -> multiply -> scalar', t => {
  var A = [[0],[1]];
  var B = [[2],[3]];
  var C = [2,3];
  var resA = matrix.multiply(A,2);
  var resB = matrix.multiply(B,3);
  var resC = matrix.scalarProduct(C,3);
  var resA2 = matrix.scalarProduct(A,2);
  var resB2 = matrix.scalarProduct(B,3);
  t.ok(deepEqual(resA,[[0],[2]]),'scalar correct A');
  t.ok(deepEqual(resB,[[6],[9]]),'scalar correct B');
  t.ok(deepEqual(resC,[6,9]),'scalar correct C');
  t.ok(deepEqual(resA2,[[0],[2]]),'scalar correct A2');
  t.ok(deepEqual(resB2,[[6],[9]]),'scalar correct B2');
  t.end();
});


test('Matrix -> multiply -> factorProduct', t => {

  var A = matrix.factorProduct(
    [
      [0, 2],
      [1, 0]
    ],
    [
      [-2],
      [ 0]
    ]
  );

  var B = matrix.factorProduct(
    [
      [0, 2],
      [1, 0]
    ],
    [
      [1],
      [1]
    ]
  );

  var C = matrix.factorProduct(
    [
      [0, 2, 1],
      [1, 0, 2],
      [1, 1, 4],
    ],
    [
      [1],
      [1],
      [1]
    ]
  );

  t.ok(deepEqual(A,[[0],[-2]]),'A correct');
  t.ok(deepEqual(B,[[2],[1]]),'B correct');
  t.ok(deepEqual(C,[[3],[3],[6]]),'C correct');
  t.end();
});

test('Matrix -> multiply -> must have same dimensions', t => {
  try {
    matrix.multiply([[0],[1]],[[1,1,1]]);
  } catch (err) {
    t.ok(err,'Throw error for different dimensions');
    t.end();
  }
});

test('Matrix -> multiply -> NxN', t => {
  var A = [
    [0, 2],
    [1, 0]
  ];

  var B = [
    [1,-2],
    [1, 0]
  ];

  var C = [
    [0, 2, 1],
    [1, 0, 3],
    [0, 1, 0]
  ];

  var D = [
    [2, 0, 1],
    [1, 1, 1],
    [1, 0, 0]
  ];

  t.ok(deepEqual(matrix.multiply(A,B),[
    [2, 0],
    [1,-2]
  ]),'correct 2x2');

  t.ok(deepEqual(matrix.multiply(C,D),[
    [3, 2, 2],
    [5, 0, 1],
    [1, 1, 1]
  ]),'correct 3x3');

  t.end();
});

test.init();
