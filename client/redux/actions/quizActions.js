import { API_URL } from '../../config';

import {
  prepareQuestionsWithAnswers,
  calculateCorrectQuestionsIDs,
  calculateCorrectAnswersIDs,
  calculateIncorrectAnswersIDs,
  calculateMissedAnswersIDs
} from '../../helpers';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export const quizActionTypes = {
  SET_QUIZ_STATE_FROM_LOCAL_STORAGE: 'SET_QUIZ_STATE_FROM_LOCAL_STORAGE',
  RESET_QUIZ: 'RESET_QUIZ',
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  SHUFFLE_QUESTIONS: 'SHUFFLE_QUESTIONS',
  SET_ACTIVE_QUESTION_INDEX: 'SET_ACTIVE_QUESTION_INDEX',
  SET_VISITED_QUESTIONS_IDS: 'SET_VISITED_QUESTIONS_IDS',
  SET_SELECTED_ANSWERS_IDS: 'SET_SELECTED_ANSWERS_IDS',
  SET_EVALUATION: 'SET_EVALUATION',
  FETCH_RESULTS: 'FETCH_RESULTS',
  SET_CORRECT_QUESTIONS_IDS: 'SET_CORRECT_QUESTIONS_IDS',
  SET_CORRECT_ANSWERS_IDS: 'SET_CORRECT_ANSWERS_IDS',
  SET_INCORRECT_ANSWERS_IDS: 'SET_INCORRECT_ANSWERS_IDS',
  SET_MISSED_ANSWERS_IDS: 'SET_MISSED_ANSWERS_IDS',
  SET_SUBMITTED: 'SET_SUBMITTED',
  OPEN_SHARE_MODAL: 'OPEN_SHARE_MODAL'
};

export function setQuizStateFromLocalStorage(persistedState) {
  return dispatch => dispatch({ type: quizActionTypes.SET_QUIZ_STATE_FROM_LOCAL_STORAGE, payload: persistedState });
}

export function resetQuiz() {
  return dispatch => dispatch({ type: quizActionTypes.RESET_QUIZ });
}

export function fetchQuestions(lessonsIDs) {
  return dispatch => fetch(`${API_URL}/questions?lessonIds=${lessonsIDs}`)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(({ data }) => data)
    .then(questions => dispatch({ type: quizActionTypes.FETCH_QUESTIONS, payload: questions }))
    .catch(error => console.error(error));
}

export function shuffleQuestions() {
  return dispatch => dispatch({ type: quizActionTypes.SHUFFLE_QUESTIONS });
}

export function setActiveQuestionIndex(questionIndex) {
  return dispatch => dispatch({ type: quizActionTypes.SET_ACTIVE_QUESTION_INDEX, payload: questionIndex });
}

export function setVisitedQuestionsIDs(visitedQuestionsIDs) {
  return dispatch => dispatch({ type: quizActionTypes.SET_VISITED_QUESTIONS_IDS, payload: visitedQuestionsIDs });
}

export function setSelectedAnswersIDs(selectedAnswersIDs) {
  return dispatch => dispatch({ type: quizActionTypes.SET_SELECTED_ANSWERS_IDS, payload: selectedAnswersIDs });
}

export function setEvaluation(bool) {
  return dispatch => dispatch({ type: quizActionTypes.SET_EVALUATION, payload: bool });
}

export function fetchResults(questions, selectedAnswersIDs) {
  const questionsWithAnswers = prepareQuestionsWithAnswers(questions, selectedAnswersIDs);

  const url = `${API_URL}/evaluation`;
  const options = {
    method: 'POST',
    body: JSON.stringify(questionsWithAnswers),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return dispatch => fetch(url, options)
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then(({ data }) => data)
    .then(results => {
      dispatch({ type: quizActionTypes.SET_CORRECT_QUESTIONS_IDS, payload: calculateCorrectQuestionsIDs(results) });
      dispatch({ type: quizActionTypes.SET_CORRECT_ANSWERS_IDS, payload: calculateCorrectAnswersIDs(results) });
      dispatch({ type: quizActionTypes.SET_INCORRECT_ANSWERS_IDS, payload: calculateIncorrectAnswersIDs(results) });
      dispatch({ type: quizActionTypes.SET_MISSED_ANSWERS_IDS, payload: calculateMissedAnswersIDs(results) });
      return dispatch({ type: quizActionTypes.FETCH_RESULTS, payload: results });
    })
    .catch(error => console.error(error));
}

export function setSubmitted(bool) {
  return dispatch => dispatch({ type: quizActionTypes.SET_SUBMITTED, payload: bool });
}

export function openShareModal(bool) {
  return dispatch => dispatch({ type: quizActionTypes.OPEN_SHARE_MODAL, payload: bool });
}
