'use strict';

var canvas = document.getElementById('xyz');
var ctx = canvas.getContext('2d');

/**
 *
 *
 */
var delta = 1;

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
    x: 1,
    y: 1,
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
function update(state) {

  // move pacman
  var dirX = state.pacman.move.x;
  var dirY = state.pacman.move.y;
  var currX = state.pacman.x;
  var currY = state.pacman.y;

  var nextX = currX, nextY = currY;

  if (dirX === '+') {
    nextX = currX + delta;
  } else if (dirX === '-') {
    nextX = currX - delta;
  }

  if (dirY === '+') {
    nextY = currY + delta;
  } else if (dirY === '-') {
    nextY = currY - delta;
  }

  var nextElm = board[nextY][nextX];

  if (nextElm === ' ') {

    if (dirX === '+') {
      state.pacman.x += delta;
    }

    if (dirX === '-') {
      state.pacman.x -= delta;
    }

    if (dirY === '+') {
      state.pacman.y += delta;
    }

    if (dirY === '-') {
      state.pacman.y -= delta;
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

  if (e.key === 'ArrowRight') {
    initialState.pacman.move.x = '+';
    initialState.pacman.move.y = '';
  }

  if (e.key === 'ArrowLeft') {
    initialState.pacman.move.x = '-';
    initialState.pacman.move.y = '';
  }

  if (e.key === 'ArrowDown') {
    initialState.pacman.move.x = '';
    initialState.pacman.move.y = '+';
  }

  if (e.key === 'ArrowUp') {
    initialState.pacman.move.x = '';
    initialState.pacman.move.y = '-';
  }
}, false);

setInterval(() => {

  var nextState = update(initialState);
  draw(nextState);
}, 200);
