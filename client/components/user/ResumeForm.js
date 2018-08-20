import React from 'react';
import PropTypes from 'prop-types';

class ResumeForm extends React.Component {
  render() {
    return (
      <div className="loginFormContainer">
        <div className="modal">
          <h1>Resume last quiz session?</h1>
          <button type="button" onClick={this.props.handleReject}>Cancel</button>
          <button type="button" onClick={this.props.handleResume}>Resume</button>
        </div>

        <div className="modal-backdrop" />
      </div>
    );
  }
}

ResumeForm.propTypes = {
  handleResume: PropTypes.func,
  handleReject: PropTypes.func
};

export default ResumeForm;
