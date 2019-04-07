'use strict';

var canvas = document.getElementById('xyz');
var ctx = canvas.getContext('2d');

/**
 *
 *
 */
var initialState = {
  score: 0,
  delta: 5,
  ball: {
    radius: 30,
    x: 200,
    y: 50,
    direction: { x: '+', y: '+' }
  },
  enemies: {
    config: {
      width: 30,
      height: 10,
      x: 0,
      y: 40,
      padding: 15,
      offsetLeftMin: 15,
      offsetLeft: 15,
      direction: '+',
    },
    list: [
      { id: 'a0', isAlive: true },
      { id: 'a1', isAlive: true },
      { id: 'a2', isAlive: true },
      { id: 'a3', isAlive: true },
      { id: 'a4', isAlive: true },
      { id: 'a5', isAlive: true },
    ]
  },
  paddle: {
    width: 60,
    height: 10,
    y: canvas.height - 15,
    x: 10,
    direction: '',
    isPressing: false,
    isFiring: false,
  },
  bullets: {
    config: { radius: 5 },
    list: []
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
    bullets,
  } = state;

  // --------------------------------------------------
  // update paddle coordinates positions
  // --------------------------------------------------
  if (paddle.isPressing) {
    paddle.x = paddle.direction === '+'
      ? paddle.x + delta
      : paddle.x - delta;
  }

  if (paddle.isFiring) {
    bullets.list.push({
      x: paddle.x + (paddle.width / 2),
      y: paddle.y,
    });
  }

  if (paddle.x >= canvas.width) {
    paddle.x = canvas.width;
  }

  if (paddle.x <= 0) {
    paddle.x = 0;
  }

  // --------------------------------------------------
  // update bullets list coordinates
  // --------------------------------------------------
  bullets.list.forEach(bullet => {
    bullet.y -= delta;
  });

  // --------------------------------------------------
  // update ball coordinates positions
  // --------------------------------------------------
  ball.x = ball.direction.x === '+'
    ? ball.x + delta
    : ball.x - delta;

  ball.y = ball.direction.y === '+'
    ? ball.y + delta
    : ball.y - delta;

  // --------------------------------------------------
  // update enemies offsetLeft
  // --------------------------------------------------
  var { config, list } = enemies;

  config.offsetLeft = config.direction === '+'
    ? config.offsetLeft + delta
    : config.offsetLeft - delta;

  var allWidth = ((config.width + config.padding) * list.length) + config.offsetLeftMin - config.padding;

  if (config.offsetLeft + allWidth >= canvas.width) {
    config.direction = '-';
    config.y += 15;
  }

  if (config.offsetLeft <= config.offsetLeftMin) {
    config.direction = '+';
    config.y += 15;
  }

  // update ball directions
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

  // bullet vs enemy collision detection
  bullets.list.forEach(bullet => {

  });

  return state;
}

/**
 *
 *
 */
function draw(state) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw ball
  // var ball = state.ball;
  // ctx.beginPath();
  // ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  // ctx.fill();

  // draw paddle
  var paddle = state.paddle;
  ctx.fillRect(paddle.x, canvas.height - 15, paddle.width, paddle.height);

  // draw enemies
  var { list, config } = state.enemies;
  list.forEach((enemy, idx) => {

    var xPosition = (idx * (config.width + config.padding)) + config.offsetLeft;
    var yPosition = config.y;

    ctx.fillRect(
      xPosition,
      yPosition,
      config.width,
      config.height
    );
  });

  // draw bullets
  state.bullets.list.forEach(bullet => {
    ctx.beginPath();
    ctx.arc(
      bullet.x,
      bullet.y,
      state.bullets.config.radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });

  // draw score
  ctx.font = '15px serif';
  ctx.fillText('Score: ' + state.score, 20, 20);
}

/**
 *
 *
 */
function main() {

  document.addEventListener('keypress', e => {

    if (e.key === 'n') {
      var currentState = stateStore[stateStore.length - 1];
      var nextState = update(clone(currentState));
      draw(nextState);
      stateStore.push(nextState);
    }

    if (e.key === 'p') {
      var previousState = stateStore.pop();
      draw(previousState);
    }
  }, false);

  // setInterval(() => {
  //   var currentState = stateStore[stateStore.length - 1];
  //   var nextState = update(currentState);
  //   draw(nextState);
  //   stateStore.push(nextState);
  // }, 50);

  document.addEventListener('keydown', e => {

    var { paddle } = stateStore[stateStore.length - 1];

    if (e.key === 'ArrowRight') {
      paddle.isPressing = true;
      paddle.direction = '+';
    }

    if (e.key === 'ArrowLeft') {
      paddle.isPressing = true;
      paddle.direction = '-';
    }

    if (e.key === 'f') {
      paddle.isFiring = true;
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

    if (e.key === 'f') {
      paddle.isFiring = false;
    }

  }, false);

  var firstState = update(clone(initialState));
  draw(firstState);
  stateStore.push(firstState);
}

main();
