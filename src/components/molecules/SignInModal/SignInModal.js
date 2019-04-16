import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { ForgotMyPasswordForm, SignInForm, Icon } from 'components';
import { signInWithGoogle } from '../../../firebase';

ReactModal.setAppElement('#root');

class SignInModal extends Component {
  state = {
    form: 'sign-in',
    showModal: false,
  };

  handleForgotPasswordCancel() {
    this.setState({ form: 'sign-in' });
  }

  handleForgotPassword() {
    this.setState({ form: 'forgotPassword' });
  }

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalOpen() {
    this.setState({ showModal: true });
  }

  render() {
    let form =
      this.state.form === 'sign-in' ? (
        <SignInForm
          handleForgotPassword={() => this.handleForgotPassword()}
          handleModalClose={() => this.handleModalClose()}
          submitForm={(email, password, setStatus, setSubmitting) =>
            this.props.onSubmitSignIn(email, password, setStatus, setSubmitting)
          }
        />
      ) : (
        <ForgotMyPasswordForm
          handleForgotPasswordCancel={() => this.handleForgotPasswordCancel()}
          submitForm={email => this.props.onSubmitForgotMyPassword(email)}
        />
      );

    return (
      <>
        <button className="btn btn-primary" onClick={signInWithGoogle}>
          Sign In
        </button>

        <ReactModal
          contentLabel="Sign In Modal"
          isOpen={this.state.showModal}
          style={{
            /* stylelint-disable-next-line */
            overlay: {
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              left: 0,
              position: 'fixed',
              right: 0,
              top: 0,
            },
            /* stylelint-disable-next-line */
            content: {
              bottom: null,
              left: null,
              maxWidth: '560px',
              minWidth: '360px',
              position: 'relative',
              right: null,
              top: null,
            },
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signInModalLabel">
                Sign-In to GSBC
              </h5>

              <button aria-label="Close" className="close" onClick={() => this.handleModalClose()}>
                <Icon name="times" />
              </button>
            </div>

            <div className="modal-body">{form}</div>
          </div>
        </ReactModal>
      </>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onSubmitForgotMyPassword: email => dispatch(authActions.resetPassword(email)),
//     onSubmitSignIn: (email, password, setStatus, setSubmitting) =>
//       dispatch(authActions.submitSignIn(email, password, setStatus, setSubmitting)),
//   };
// };

export default SignInModal;
