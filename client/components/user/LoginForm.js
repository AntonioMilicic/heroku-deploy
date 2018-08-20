import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="loginFormContainer">
        <div className="modal">
          <img src="/static/images/loginPicture.png" width="160" height="160" alt="Riddler" />

          <a href="http://localhost:9000/auth/google">
            <button type="button">Log In With Google</button>
          </a>

          <button
            type="button"
            onClick={this.props.handleShowLoginForm}>
            Cancel
          </button>
        </div>

        <div
          className="modal-backdrop"
          onClick={this.props.handleShowLoginForm}>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleShowLoginForm: PropTypes.func
};

export default LoginForm;
