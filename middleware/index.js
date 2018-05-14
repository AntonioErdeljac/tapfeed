import { AsyncStorage } from 'react-native';
import { merge } from 'lodash';
import agent from '../agent';

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => (action) => {
  console.error(action);
  if (isPromise(action.payload)) {
    action.payload.then(
      (res) => {
        merge(action, { payload: res });
        store.dispatch(action);
      },
      (error) => {
        merge(action, { error: true, payload: error.response.body });
        store.dispatch(action);
      },
    );
    return;
  }
  next(action);
};

const localStorageMiddleware = () => next => (action) => {
  if (action.type === 'LOGIN' || action.type === 'REGISTER') {
    if (!action.error) {
      AsyncStorage.setItem('Token', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT') {
    AsyncStorage.clear();
    agent.setToken(null);
  }
  next(action);
};

export {
  promiseMiddleware,
  localStorageMiddleware,
};
