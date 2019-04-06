## Space Invadors

Shoot all the enemies before they do.

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
