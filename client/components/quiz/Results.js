import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class Results extends React.Component {
  render() {
    const user = this.props.user;
    let totalScore;

    if (user !== undefined) {
      if (!isEmpty(user)) {
        totalScore = user.totalScore;
      }
    }

    return (
      <div className="resultsContainer">

        {totalScore ? <h4>Your score: {totalScore}</h4> : null}

        <h4>Top scores:</h4>

        <table>
          <tbody>
            <tr>
              <th>UserName</th>
              <th>Score</th>
            </tr>
            <tr>
              <td>UserName</td>
              <td>Score</td>
            </tr>
            <tr>
              <td>UserName</td>
              <td>Score</td>
            </tr>
            <tr>
              <td>UserName</td>
              <td>Score</td>
            </tr>
            <tr>
              <td>UserName</td>
              <td>Score</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

Results.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
};

export default connect(mapStateToProps)(Results);
