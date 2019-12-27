'use strict';

var canvas = document.getElementById('xyz');
var ctx = canvas.getContext('2d');

/**
 *
 *
 */
var delta = 0.25;

/**
 *
 *
 */
var board = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

/**
 *
 *
 */
var initialState = {
  dots: [

  ],
  pacman: {
    x: 6,
    y: 2,
    move: { x: '+', y: '' }
  },
  ghosts: {
    config: {},
    list: [],
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

  // move pacman
  var dirX = state.pacman.move.x;
  var dirY = state.pacman.move.y;
  var currX = state.pacman.x;
  var currY = state.pacman.y;

  var nextX = state.pacman.x, nextY = state.pacman.y;

  if (dirX === '+') {
    nextX = math(currX, '+', delta);
    nextX = Math.ceil(nextX);
  } else if (dirX === '-') {
    nextX = math(currX, '-', delta);
    nextX = Math.floor(nextX);
  }

  if (dirY === '+') {
    nextY = math(currY, '+', delta);
    nextY = Math.ceil(nextY);
  } else if (dirY === '-') {
    nextY = math(currY, '-', delta);
    nextY = Math.floor(nextY);
  }

  try {
    var nextElm = board[nextY][nextX];
  } catch (error) {
    nextElm = '#';
  }

  if (nextElm === ' ') {

    if (dirX === '+') {
      state.pacman.x = math(state.pacman.x, '+', delta);
    }

    if (dirX === '-') {
      state.pacman.x = math(state.pacman.x, '-', delta);
    }

    if (dirY === '+') {
      state.pacman.y = math(state.pacman.y, '+', delta);
    }

    if (dirY === '-') {
      state.pacman.y = math(state.pacman.y, '-', delta);
    }
  }

  return state;
}

/**
 *
 *
 */
function draw(state) {

  // clear everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw board
  var x, y, multiplier = 30;
  for (y = 0; y < board.length; y++) {
    for (x = 0; x < board[y].length; x++) {
      if (board[y][x] !== '#') continue;
      ctx.beginPath();
      ctx.rect(
        x * multiplier,
        y * multiplier,
        multiplier,
        multiplier
      );
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    }
  }

  // draw pacman
  ctx.beginPath();
  ctx.arc(
    (state.pacman.x * multiplier) + multiplier / 2,
    (state.pacman.y * multiplier) + multiplier / 2,
    multiplier / 2,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

document.addEventListener('keydown', e => {

  var { pacman } = stateStore[stateStore.length - 1];

  if (e.key === 'ArrowRight') {
    pacman.move.x = '+';
    pacman.move.y = '';
  }

  if (e.key === 'ArrowLeft') {
    pacman.move.x = '-';
    pacman.move.y = '';
  }

  if (e.key === 'ArrowDown') {
    pacman.move.x = '';
    pacman.move.y = '+';
  }

  if (e.key === 'ArrowUp') {
    pacman.move.x = '';
    pacman.move.y = '-';
  }
}, false);

// document.addEventListener('keypress', e => {
//
//   if (e.key === 'n') {
//     var currentState = stateStore[stateStore.length - 1];
//     var nextState = update(clone(currentState));
//     draw(nextState);
//     stateStore.push(nextState);
//   }
//
//   if (e.key === 'p') {
//     var previousState = stateStore.pop();
//     draw(previousState);
//   }
// }, false);

stateStore.push(initialState);
draw(initialState);

setInterval(() => {
  var currentState = stateStore[stateStore.length - 1];
  var nextState = update(clone(currentState));
  draw(nextState);
  stateStore.push(nextState);
}, 50);
