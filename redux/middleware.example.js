'use strict';

var redux = require('./redux.js');

function reducer (state, action) {
  if (action.type === 'one') return 'one';
  return 'none';
}

console.log('applyMiddleware');
var substitute = applyMiddleware(
  middleOne
)(redux.createStore);

console.log('createOtherStore');
var store = substitute(reducer, 'start');

store.dispatch({type:'one'});
console.log('state',store.getState());

// ============================================================================

function applyMiddleware (middleware) {
  console.log('01');
  return function (createStore) {
    console.log('02');
    return function createStoreSubstitute (reducer, initialState) {
      console.log('03');
      var store = createStore(reducer, initialState);
      console.log('04');
      var dispatch = middleware(store)(store.dispatch);
      console.log('07');
      return {
        getState: store.getState,
        dispatch: dispatch,
        subscribe: store.subscribe,
      };
    };
  };
}

function middleOne(store) {
  console.log('05');
  return function (dispatch) {
    console.log('06');
    return function (action) {
      console.log('apply middleware to action:', action);
      return dispatch(action);
    }
  }
}