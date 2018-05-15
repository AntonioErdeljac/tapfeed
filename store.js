import { createStore, combineReducers } from 'redux';

import { common, home, source } from './reducers';


const reducer = combineReducers({
  common,
  home,
  source,
});

const store = createStore(reducer);

export default store;
