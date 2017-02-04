```js
/**
 * Write a function `test` which takes two arguments.
 * The first argument is a `string` while the second is a `function`.
 * Every time the function `test` executes it should log the text in
 * the first argument and also check if the two arguments of `t` are equal.
 * If the two arguments of `t` are equal should print `OK:<message text>`.
 */

var test = function (/* initial args */) {
  // store inside
  // define interface
  // return something
}

test('First',function(t) {
  t.equal(1,1,'one is equal to one');
});

test('Second', function(t) {
  t.equal(2,3,'two is equal to two');
});

test('Third', function(t) {
  t.equal(3,3,'three is equal to three');
});
```
