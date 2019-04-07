## Space Invadors

Shoot all the enemies before they do.

The game has two main functions, `update` and `draw`. The `update` function takes
the game state and returns the next frame game state. The `draw` function instead
simply takes any state and draws it to the canvas.

This separation of concern should help the game development making it easier to reason
about. On top of that, the state object is treated as immutable. Every time a new
state is calculated the object representing it is cloned and stored in an array.

```js
type GameState = { /* whatever */ };
type Update = (state: GameState) => GameState;
type Draw = (state: GameState) => Void;
type StoreState: Array<GameState>;

var storeState = [];

function update(state) {
  // stuff
  return newState;
}

function draw(state) {
  // mutate canvas
}

loop(() => {
  var currentState = storeState.last();
  var nextState = update(currentState);
  draw(nextState);
  storeState.push(nextState);
});
```

## Canvas

Draw and fill a rectangle

```js
ctx.fillRect(
  10,  // X-axis start coordinate
  10,  // Y-axis start coordinate
  30,  // width
  20,  // height
);
```

Draw a cirlce

```js
ctx.beginPath();
ctx.arc(
  10,          // X-axis coordinate center
  10,          // Y-axis coordinate center
  20,          // radius
  0,           // start angle radian
  2 * Math.PI, // end angle radian
);
ctx.stroke();
```

## Resources
- [MDN create a 2D game](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
- [MDN canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [JS and game timing](https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing)
