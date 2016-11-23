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
- jQuery

```js
/**
 * Let's build jQuery. The function should follow the
 * below interface.
 */

var $ = function(/* .... */) {
  // code here
};

var myTitle = $('h1')

myTitle.addClass('welcome').text('Hello, World!');

setTimeout(function() {
  myTitle.hide();
},1000);

setTimeout(function() {
  myTitle.show();
},2000);
```

- Mocking

```js
/**
 * Look at the following code.
 */

// don't worry about this.
var test=function(){"use strict";function b(b,c){var d={equal:function(a,b,c){a===b?console.log("PASS: "+c):console.error("ERROR: "+c)},ok:function(a,b){a?console.log("PASS: "+b):console.error("ERROR: "+b)},end:function(){var b=a.shift();delete this.equal,delete this.end,"function"==typeof b&&b()}};a.push(c.bind(null,d))}var a=[];return b.init=function(){var b=a.shift();"function"==typeof b&&b()},b}();

var jQuery = function(document) {
  return function(selector) {
    var element = document.querySelector(selector);
    var obj = {};

    obj.addClass = function (newClass) {
      element.classList.add(newClass);
      return obj;
    };

    obj.text = function (text) {
      element.innerHTML = text;
      return obj;
    };

    return obj;
  };
};

var $ = jQuery(document);
```

Week 3

- Compose

```js
/**
 *  Create a function called 'passOutputsAsInputs'
 *  which takes as arguments other functions and returns
 *  a another function. The new function behaves as a
 *  chain of all the functions put together.
 */
var passOutputsAsInputs = function(/* */) {
  // code here
};

function add_one (n) {
  const total = n + 1;
  return total;
}

function less_one (n) {
  const total = n - 1;
  return total;
}

function multiply_two (n) {
  const total = n * 2;
  return total;
}

function start (n) {
  return parseInt(n);
}

const parseAddMultiplySubtract = passOutputsAsInputs(
  less_one,
  multiply_two,
  add_one,
  start
);

parseAddMultiplySubtract('1'); // 3
```

- Async Parallel

```js
/**
 * Complete the 'parallel' function. It should fire
 * all the tasks at the same time, and invoke the
 * final callback when they are all done.
 * In case of an error should fire the final callback
 * immediately.
 * More spec http://caolan.github.io/async/docs.html#parallel
 */

function parallel(tasks,callback) {
  // code here
}

parallel([
  function(callback) {
    setTimeout(function() {
      callback(undefined,1);
    },2000);
  },
  function(callback) {
    setTimeout(function() {
      callback(undefined,2);
    },1000);
  },
  function(callback) {
    setTimeout(function() {
      callback(undefined,3);
    },1500);
  },
  // function(callback) {
  //   setTimeout(function() {
  //     callback('boom',undefined);
  //   },1200);
  // }
], function(err,result) {
  console.log('err',err); // undefined
  console.log('result',result); // [1,2,3]
});
```
