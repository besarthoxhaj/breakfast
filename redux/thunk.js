'use strict';

module.exports = thunk;

function thunk (store) {
  return function (dispatch) {
    return function (action) {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
      }
      return dispatch(action);
    }
  }
}