import { createStore, combineReducers } from 'redux';

import { common, home } from './reducers';


const reducer = combineReducers({
  common,
  home,
});

const store = createStore(reducer);

export default store;
