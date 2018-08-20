import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topics from '../../containers/Topics';
import QuizActive from '../../containers/QuizActive';

class Quiz extends React.Component {
  render() {
    return (
      <div className="quizContainer">
        {this.props.selection !== 'quiz' ? <Topics /> : null}

        {this.props.selection === 'quiz' ? <QuizActive /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selection } = state.topics;
  return { selection };
}

Quiz.propTypes = {
  selection: PropTypes.string
};

export default connect(mapStateToProps)(Quiz);
