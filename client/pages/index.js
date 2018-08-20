import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTopics } from '../redux/actions/topicsActions';

import Carousel from '../components/Carousel';
import Credits from '../components/Credits';
import Header from '../containers/Header';
import Results from '../components/quiz/Results';
import Quiz from '../components/quiz/Quiz';

class Index extends React.Component {
  static async getInitialProps({ reduxStore }) {
    await reduxStore.dispatch(fetchTopics());
    return {};
  }

  render() {
    return (
      <div className="indexContainer">
        <Header />
        <Carousel />
        <Quiz />
        <Results />
        <Credits />
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Index);
