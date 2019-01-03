import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import * as authActions from '../../../store/actions/auth';
import { SignInForm, TimesIcon } from 'components';
import './SignInModal.css';

ReactModal.setAppElement('#root');

class SignInModal extends Component {
  state = {
    showModal: false,
  };

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalOpen() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={() => this.handleModalOpen()}
        >
          Sign In
        </button>

        <ReactModal
          contentLabel="Sign In Modal"
          isOpen={this.state.showModal}
          style={{
            /* stylelint-disable-next-line */
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            /* stylelint-disable-next-line */
            content: {
              bottom: '25%',
              left: '25%',
              right: '25%',
              top: '25%',
            },
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signInModalLabel">
                Sign-In to GSBC
              </h5>

              <button
                aria-label="Close"
                className="close"
                onClick={() => this.handleModalClose()}
              >
                <TimesIcon />
              </button>
            </div>

            <SignInForm
              handleModalClose={() => this.handleModalClose()}
              submitForm={(email, password) =>
                this.props.onSubmitSignIn(email, password)
              }
            />
          </div>
        </ReactModal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitSignIn: (email, password) =>
      dispatch(authActions.submitSignIn(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInModal);
