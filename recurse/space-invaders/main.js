'use strict';

var canvas = document.getElementById('xyz');
var ctx = canvas.getContext('2d');

/**
 *
 *
 */
var initialState = {
  delta: 5,
  ball: {
    radius: 30,
    x: 200,
    y: 50,
    direction: { x: '+', y: '+' }
  },
  enemies: [],
  paddle: {
    width: 60,
    height: 10,
    y: canvas.height - 15,
    x: 10,
    direction: '',
    isPressing: false,
  },
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

  // --------------------------------------------------
  // update paddle coordinates positions
  // --------------------------------------------------
  if (paddle.isPressing) {
    paddle.x = paddle.direction === '+'
      ? paddle.x + delta
      : paddle.x - delta;
  }

  if (paddle.x >= canvas.width) {
    paddle.x = canvas.width;
  }

  if (paddle.x <= 0) {
    paddle.x = 0;
  }

  // --------------------------------------------------
  // update ball coordinates positions
  // --------------------------------------------------
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

  var isTouchingPaddle = cornerBottom >= paddle.y
    && ball.x >= paddle.x
    && ball.x <= paddle.x + paddle.width;

  if (isTouchingRight) {
    ball.direction.x = '-';
  }

  if (isTouchingLeft) {
    ball.direction.x = '+';
  }

  if (isTouchingTop) {
    ball.direction.y = '+';
  }

  if (isTouchingBottom || isTouchingPaddle) {
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

  // draw paddle
  var paddle = state.paddle;
  ctx.fillRect(paddle.x, canvas.height - 15, paddle.width, paddle.height);
}

/**
 *
 *
 */
function main() {

  document.addEventListener('keypress', e => {

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

  document.addEventListener('keydown', e => {

    var { paddle } = stateStore[stateStore.length - 1];

    if(e.key === 'ArrowRight') {
      paddle.isPressing = true;
      paddle.direction = '+';
    }

    if(e.key === 'ArrowLeft') {
      paddle.isPressing = true;
      paddle.direction = '-';
    }
  }, false);

  document.addEventListener('keyup', e => {

    var { paddle } = stateStore[stateStore.length - 1];

    if(e.key === 'ArrowRight') {
      paddle.isPressing = false;
    }

    if(e.key === 'ArrowLeft') {
      paddle.isPressing = false;
    }

  }, false);

  var firstState = update(initialState);
  draw(firstState);
  stateStore.push(firstState);
}

main();
