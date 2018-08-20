import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FacebookShareButton, FacebookIcon } from 'react-share';

import { APP_URL } from '../../config';
import { openShareModal } from '../../redux/actions/quizActions';

class QuizFinished extends React.Component {
  backSelection() {
    const { dispatch } = this.props;
    dispatch(openShareModal(false));
  }

  render() {
    const correctQuestions = this.props.correctQuestionsIDs.length;
    const totalQuestions = this.props.questions.length;
    const correctAnswers = this.props.correctAnswersIDs.length;
    const incorrectAnswers = this.props.incorrectAnswersIDs.length;
    const missedAnswers = this.props.missedAnswersIDs.length;
    const score = 'XXX';
    const totalScore = 'XXX';

    return (
      <div className="quizFinishedContainer">
        <div className="modal">
          <div>
            Congratulations, you earned {score} points!
          </div>

          <div>
            <p>Correct questions: {correctQuestions} / {totalQuestions}</p>
            <p>Correct answers: {correctAnswers}</p>
            <p>Incorrect answers: {incorrectAnswers}</p>
            <p>Missed answers: {missedAnswers}</p>
          </div>

          <div>
            Your score is: {totalScore}!
          </div>

          <div>
            Share on:
            <FacebookShareButton url={APP_URL} quote={`My score is ${totalScore}, come play with me!`}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          <a >
            <button
              type="button"
              onClick={() => this.backSelection()}
            >
              Close
            </button>
          </a>
        </div>

        <div className="modal-backdrop" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    questions,
    correctQuestionsIDs,
    correctAnswersIDs,
    incorrectAnswersIDs,
    missedAnswersIDs
  } = state.quiz;
  return {
    questions,
    correctQuestionsIDs,
    correctAnswersIDs,
    incorrectAnswersIDs,
    missedAnswersIDs
  };
}

QuizFinished.propTypes = {
  dispatch: PropTypes.func,
  questions: PropTypes.array,
  correctQuestionsIDs: PropTypes.array,
  correctAnswersIDs: PropTypes.array,
  incorrectAnswersIDs: PropTypes.array,
  missedAnswersIDs: PropTypes.array
};

export default connect(mapStateToProps)(QuizFinished);
