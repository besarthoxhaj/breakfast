## Middleware



```js
function init () {

  const app = () => app.handle();
  app.stack = [];
  app.use = fn => app.stack.push(fn);
  app.handle = () => {
    let idx = 0;
    var stack = app.stack;
    var next = () => stack[idx] && stack[idx](next) && idx++;
    next();
  };

  return app;
}
```



```js
var myApp = init();

myApp.use(async next => {
  await wait(500);
  console.log("One!");
  next();
});

myApp.use(async next => {
  await wait(500);
  console.log("Two!");
  next();
});

myApp();
```
