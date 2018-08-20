import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { saveState } from './redux/localStorage';
import { authReducer, authInitialState } from './redux/reducers/authReducer';
import { topicsReducer, topicsInitialState } from './redux/reducers/topicsReducer';
import { quizReducer, quizInitialState } from './redux/reducers/quizReducer';

const appInitialState = {
  auth: authInitialState,
  topics: topicsInitialState,
  quiz: quizInitialState
};

const rootReducer = combineReducers({
  auth: authReducer,
  topics: topicsReducer,
  quiz: quizReducer
});

export function initializeStore(initialState = appInitialState) {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 100));
  return store;
}
