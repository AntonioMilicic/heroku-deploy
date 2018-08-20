import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { loadState } from '../redux/localStorage';
import { userInLocalStorage, quizInLocalStorage } from '../helpers';
import { fetchUser, setAuthStateFromLocalStorage, saveUser } from '../redux/actions/authActions';
import { setTopicsStateFromLocalStorage } from '../redux/actions/topicsActions';
import { setQuizStateFromLocalStorage } from '../redux/actions/quizActions';

import ResumeForm from '../components/user/ResumeForm';
import LoginForm from '../components/user/LoginForm';
import Spinner from '../components/Spinner';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showResumeForm: false,
      showLoginForm: false
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const persistedState = loadState();
    const user = await fetchUser();

    if (user === undefined) return dispatch(saveUser({}));
    if (isEmpty(user)) return dispatch(saveUser({}));
    if (persistedState === undefined) return dispatch(saveUser(user));
    else {
      const userMatch = userInLocalStorage(persistedState, user);
      const quizExists = quizInLocalStorage(persistedState);
      if (userMatch === true && quizExists === true) {
        return this.setState({ showResumeForm: true });
      }
      return dispatch(saveUser(user));
    }
  }

  async handleResume() {
    const { dispatch } = this.props;
    const persistedState = loadState();
    await dispatch(setQuizStateFromLocalStorage(persistedState.quiz));
    await dispatch(setTopicsStateFromLocalStorage(persistedState.topics));
    await dispatch(setAuthStateFromLocalStorage(persistedState.auth));
    this.setState({ showResumeForm: false });
  }

  async handleReject() {
    const { dispatch } = this.props;
    const user = await fetchUser();
    dispatch(saveUser(user));
    this.setState({ showResumeForm: false });
  }

  handleShowLoginForm() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }

  render() {
    const user = this.props.user;
    let inOutButton = null;

    if (user === undefined) inOutButton = <Spinner />;
    else if (isEmpty(user)) {
      inOutButton = (
        <a onClick={this.handleShowLoginForm.bind(this)}>
          <button type="button">Log In</button>
        </a>
      );
    } else {
      inOutButton = (
        <a href="http://localhost:9000/auth/logout">
          <button type="button">Log Out</button>
        </a>
      );
    }

    return (
      <header className="headerContainer">
        <h1>Kviskoteka - one quiz to rule them all</h1>

        {
          this.state.showResumeForm &&
          <ResumeForm
            handleResume={this.handleResume.bind(this)}
            handleReject={this.handleReject.bind(this)}
          />
        }

        <div>
          {inOutButton}
        </div>

        {
          this.state.showLoginForm &&
          <LoginForm
            handleShowLoginForm={this.handleShowLoginForm.bind(this)}
          />
        }
      </header>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

Header.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
};

export default connect(mapStateToProps)(Header);
