## Observ


```js
function observer(initValue) {

  var store = initValue;
  var listeners = [];

  /**
   *
   *
   */
  function handler(listener) {

    if (listener) return listeners.push(listener);
    return store;
  }

  /**
   *
   *
   */
  handler.set = function(nextValue) {

    store = nextValue;
    listeners.forEach(listener => {
      listener(store);
    });
  }

  return handler;
}
```
