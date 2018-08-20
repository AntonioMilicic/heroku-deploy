import { quizActionTypes } from '../actions/quizActions';
import { shuffleArray } from '../../helpers';

export const quizInitialState = {
  questions: [],
  activeQuestionIndex: 0,
  visitedQuestionsIDs: [0],
  selectedAnswersIDs: [],
  evaluation: false,
  results: [],
  correctQuestionsIDs: [],
  correctAnswersIDs: [],
  incorrectAnswersIDs: [],
  missedAnswersIDs: [],
  submitted: false,
  openShareModal: false
};

export function quizReducer(state = quizInitialState, action) {
  switch (action.type) {
    case quizActionTypes.SET_QUIZ_STATE_FROM_LOCAL_STORAGE:
      return Object.assign({}, state,
        action.payload
      );
    case quizActionTypes.RESET_QUIZ:
      return Object.assign({}, state,
        quizInitialState
      );
    case quizActionTypes.FETCH_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload
      });
    case quizActionTypes.SHUFFLE_QUESTIONS:
      let questions = Object.assign([], state.questions);
      questions = shuffleArray(questions);
      return Object.assign({}, state, {
        questions: questions
      });
    case quizActionTypes.SET_ACTIVE_QUESTION_INDEX:
      return Object.assign({}, state, {
        activeQuestionIndex: action.payload
      });
    case quizActionTypes.SET_VISITED_QUESTIONS_IDS:
      return Object.assign({}, state, {
        visitedQuestionsIDs: action.payload
      });
    case quizActionTypes.SET_SELECTED_ANSWERS_IDS:
      return Object.assign({}, state, {
        selectedAnswersIDs: action.payload
      });
    case quizActionTypes.SET_EVALUATION:
      return Object.assign({}, state, {
        evaluation: action.payload
      });
    case quizActionTypes.FETCH_RESULTS:
      return Object.assign({}, state, {
        results: action.payload
      });
    case quizActionTypes.SET_CORRECT_QUESTIONS_IDS:
      return Object.assign({}, state, {
        correctQuestionsIDs: action.payload
      });
    case quizActionTypes.SET_CORRECT_ANSWERS_IDS:
      return Object.assign({}, state, {
        correctAnswersIDs: action.payload
      });
    case quizActionTypes.SET_INCORRECT_ANSWERS_IDS:
      return Object.assign({}, state, {
        incorrectAnswersIDs: action.payload
      });
    case quizActionTypes.SET_MISSED_ANSWERS_IDS:
      return Object.assign({}, state, {
        missedAnswersIDs: action.payload
      });
    case quizActionTypes.SET_SUBMITTED:
      return Object.assign({}, state, {
        submitted: action.payload
      });
    case quizActionTypes.OPEN_SHARE_MODAL:
      return Object.assign({}, state, {
        openShareModal: action.payload
      });
    default: return state;
  }
}
