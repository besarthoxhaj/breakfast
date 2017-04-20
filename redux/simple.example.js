'use strict';

var redux = require('./redux.js');

function reducer (state, action) {
  if (action.type === 'one') return 'one';
  return 'none';
}

var store = redux.createStore(reducer, 'start');

store.dispatch({type:'one'});

console.log('state',store.getState());