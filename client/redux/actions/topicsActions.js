import { API_URL } from '../../config';

export const topicsActionTypes = {
  SET_TOPICS_STATE_FROM_LOCAL_STORAGE: 'SET_TOPICS_STATE_FROM_LOCAL_STORAGE',
  FETCH_TOPICS: 'FETCH_TOPICS',
  SET_SELECTION: 'SET_SELECTION',
  FETCH_COURSES: 'FETCH_COURSES',
  FETCH_LESSONS: 'FETCH_LESSONS',
  SET_SELECTED_LESSONS_IDS: 'SET_SELECTED_LESSONS_IDS'
};
require('es6-promise').polyfill();
require('isomorphic-fetch');

export function setTopicsStateFromLocalStorage(persistedState) {
  return dispatch => dispatch({ type: topicsActionTypes.SET_TOPICS_STATE_FROM_LOCAL_STORAGE, payload: persistedState });
}

export function fetchTopics() {
  return dispatch => fetch(`${API_URL}/topics`)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(({ data }) => data)
    .then(topics => dispatch({ type: topicsActionTypes.FETCH_TOPICS, payload: topics }))
    .catch(error => console.error(error));
}

export function setSelection(selection) {
  return dispatch => dispatch({ type: topicsActionTypes.SET_SELECTION, payload: selection });
}

export function fetchCourses(topicId) {
  return dispatch => fetch(`${API_URL}/topics/${topicId}/courses`)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(({ data }) => data)
    .then(courses => dispatch({ type: topicsActionTypes.FETCH_COURSES, payload: courses }))
    .catch(error => console.error(error));
}

export function fetchLessons(courseId) {
  return dispatch => fetch(`${API_URL}/courses/${courseId}/lessons`)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(({ data }) => data)
    .then(lessons => dispatch({ type: topicsActionTypes.FETCH_LESSONS, payload: lessons }))
    .catch(error => console.error(error));
}

export function setSelectedLessonsIDs(selectedLessonsIDs) {
  return dispatch => dispatch({ type: topicsActionTypes.SET_SELECTED_LESSONS_IDS, payload: selectedLessonsIDs });
}
