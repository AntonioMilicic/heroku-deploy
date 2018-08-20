import { authActionTypes } from '../actions/authActions';

export const authInitialState = {
  user: undefined
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case authActionTypes.SET_AUTH_STATE_FROM_LOCAL_STORAGE:
      return Object.assign({}, state,
        action.payload
      );
    case authActionTypes.SAVE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    default: return state;
  }
};
