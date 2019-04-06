'use strict';

var canvas = document.getElementById('xyz');
var ctx = canvas.getContext('2d');

/**
 *
 *
 */
var initialState = {
  delta: 1,
  ball: { radius: 30, x: 200, y: 50, direction: { x: '+', y: '+' } },
  enemies: [],
  paddle: {},
};

/**
 *
 *
 */
var stateStore = [];

/**
 *
 *
 */
function clone(state) {
  return JSON.parse(
    JSON.stringify(
      state
    )
  );
}

/**
 *
 *
 */
function update(state) {

  var {
    delta,
    ball,
    enemies,
    paddle,
  } = state;

  // update ball x and y positions
  ball.x = ball.direction.x === '+'
    ? ball.x + delta
    : ball.x - delta;

  ball.y = ball.direction.y === '+'
    ? ball.y + delta
    : ball.y - delta;

  // update directions
  var cornerRight = ball.x + ball.radius;
  var cornerLeft = ball.x - ball.radius;
  var cornerTop = ball.y - ball.radius;
  var cornerBottom = ball.y + ball.radius;

  var isTouchingRight = cornerRight >= canvas.width;
  var isTouchingLeft = cornerLeft <= 0;
  var isTouchingTop = cornerTop <= 0;
  var isTouchingBottom = cornerBottom >= canvas.height;

  if (isTouchingRight) {
    ball.direction.x = '-';
  }

  if (isTouchingLeft) {
    ball.direction.x = '+';
  }

  if (isTouchingTop) {
    ball.direction.y = '+';
  }

  if (isTouchingBottom) {
    ball.direction.y = '-';
  }

  return clone(state);
}

/**
 *
 *
 */
function draw(state) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw ball
  var ball = state.ball;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
}

/**
 *
 *
 */
function main() {

  document.addEventListener('keypress', (e) => {

    if (e.key === 'n') {
      var currentState = stateStore[stateStore.length - 1];
      var nextState = update(currentState);
      draw(nextState);
      stateStore.push(nextState);
    }

    if (e.key === 'p') {
      var previousState = stateStore.pop();
      draw(previousState);
    }
  }, false);

  var firstState = update(initialState);
  draw(firstState);
  stateStore.push(firstState);
}

main();
