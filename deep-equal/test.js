'use strict';

var test = require('../tape/index.js');
var deepEqual = require('./index.js');

test('Two empty arrays', function(t) {
  t.ok(deepEqual([],[]), 'two empty arrays are deepEqual');
  t.end();
});

test('Two arrays not emptys', function(t) {
  t.notOk(deepEqual([1],[2]), 'two different arrays are not deepEqual');
  t.end();
});

test('Two equal arrays not emptys', function(t) {
  t.ok(deepEqual([1,2,3,4,5, 'string'],[1,2,3,4,5, 'string']), 'two arrays with the same elements are deepEqual');
  t.end();
});

test('Two empty object', function(t) {
  t.ok(deepEqual({},{}), 'two objects are the same');
  t.end();
});

test('Two object with different keys order', function(t) {
  t.ok(deepEqual({a:'one',b:'two'},{b:'two',a:'one'}), 'two objects are the same');
  t.end();
});

test('Two object with different keys length', function(t) {
  t.notOk(deepEqual({a:'one',b:'two'}, {b:'two',a:'one', c: 'three'}), 'two objects with different length are no the same');
  t.end();
});

test('Two object with other nested object', function(t) {
  t.ok(deepEqual({a:{b:'b'},c:'c'},{a:{b:'b'},c:'c'}), 'two equal nested objects');
  t.end();
});

test('Two object with other nested object with different values', function(t) {
  t.notOk(deepEqual({a:{b:'b'},c:'c'},{a:{b:'c'},c:'c'}), 'two slightly different nested objects');
  t.end();
});

test('Two object with same nested arrays', function(t) {
  t.ok(deepEqual({a:['a'],c:'c'},{a:['a'],c:'c'}), 'two nested arrays');
  t.end();
});

test('Two object with same nested arrays but different key', function(t) {
  t.notOk(deepEqual({a:['a'],c:'b'},{a:['a'],c:'c'}), 'two different keys');
  t.end();
});

test('Two object with different nested arrays', function(t) {
  t.notOk(deepEqual({a:['a'],c:'c'},{a:['b'],c:'c'}), 'two different nested arrays');
  t.end();
});

test('Two arrays with nested array', function(t) {
  t.ok(deepEqual(['a',['b'],'c'],['a',['b'],'c']), 'same nested arrays');
  t.notOk(deepEqual(['a',['b'],'c'],['a',['d'],'c']), 'different nested arrays');
  t.end();
});

test('Two arrays with nested objects', function(t) {
  t.ok(deepEqual(['a',{b:'b'}],['a',{b:'b'}]), 'two array with same nested object');
  t.notOk(deepEqual(['a',{b:'d'},'c'],['a',{b:'b'},'c']), 'two array with different nested object');
  t.end();
});

test('Crazy combination', function(t) {
  var a = {
    b:[{c:'c',b:['e']},'d'],
    c:'c',
    d:{
      e:['f','g']
    }
  };
  var b = {
    b:[{c:'c',b:['e']},'d'],
    c:'c',
    d:{
      e:['g','f'] // <-- here is the difference
    }
  };
  var c = {
    b:[{c:'c',b:['e']},'d'],
    c:'c',
    d:{
      e:['f','g']
    }
  };
  t.ok(deepEqual(a,c), 'true');
  t.notOk(deepEqual(a,b), 'false');
  t.end();
});

test.init();
