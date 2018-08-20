import { topicsActionTypes } from '../actions/topicsActions';

export const topicsInitialState = {
  topics: [],
  courses: [],
  lessons: [],
  selection: 'topics',
  selectedLessonsIDs: []
};

export function topicsReducer(state = topicsInitialState, action) {
  switch (action.type) {
    case topicsActionTypes.SET_TOPICS_STATE_FROM_LOCAL_STORAGE:
      return Object.assign({}, state,
        action.payload
      );
    case topicsActionTypes.FETCH_TOPICS:
      return Object.assign({}, state, {
        topics: action.payload
      });
    case topicsActionTypes.SET_SELECTION:
      return Object.assign({}, state, {
        selection: action.payload
      });
    case topicsActionTypes.FETCH_COURSES:
      return Object.assign({}, state, {
        courses: action.payload
      });
    case topicsActionTypes.FETCH_LESSONS:
      return Object.assign({}, state, {
        lessons: action.payload
      });
    case topicsActionTypes.SET_SELECTED_LESSONS_IDS:
      return Object.assign({}, state, {
        selectedLessonsIDs: action.payload
      });
    default: return state;
  }
}
