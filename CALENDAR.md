## Calendar

Week 2

- Build a sync tape version

```js
/**
 * Write a test function which satisfies the interface
 * below and passes the tests. Copy and paste the code
 * on https://repl.it and try to run it.
 */

var test = function(/* .... */) {
  // code here
};

function modulo(base,num) {
  return num % base;
}

function add(a,b) {
  return a + b;
}

test('Test addition functionality', function(t) {
  var res = add(1,2);
  t.equal(res,3,'got result 3');
});

test('Test modulo functionality', function(t) {
  var res = modulo(2,5);
  t.equal(res,1,'res is 1');
});
```
- Build an async tape version

```js
/**
 * Let's upgrade our test framework to support
 * async tests. This means the tests should run
 * in order. In this case they should print 1,2,3
 * and not 1,3,2. You can help yourself by adding
 * two additional methods t.end() and test.init().
 */

var test = function(/* .... */) {
  // code here
};

test('ONE', function(t) {
  t.equal(1,1,'1');
  setTimeout(function() {
    t.equal(2,2,'2');
    t.end();
  },1000);
});

test('TWO', function(t) {
  t.equal(3,3,'3');
});

test.init();
```
- Deep-equal

```js
/**
 * Sometimes we want to test more complicated data structures
 * than string or number. We may want to check if two objects
 * or to arrays got the same elements. Write a function which
 * compares two nested objects or arrays.
 */

var deepEqual = function(/* .... */) {
  // code here
};

console.log(deepEqual(
  [{a:3},{b:4}],
  [{a:'3'},{b:'4'}]
)); // -> false

console.log(deepEqual(
  {a:[2,3],b:[4]},
  {b:[4],a:[2,3]}
)); // -> true

console.log(deepEqual(
  'hello',
  'hello'
)); // -> true
```
- Spy
- Mock

Week 3

-
