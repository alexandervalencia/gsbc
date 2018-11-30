import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import * as authActions from '../../../store/actions/auth';
import { TimesIcon } from 'components';
import './ModalSignIn.css';

class ModalSignIn extends Component {
  state = {
    email: '',
    password: '',
    showModal: false,
  };

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalOpen() {
    this.setState({ showModal: true });
  }

  handleSignIn() {}

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
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
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
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

            <form
              id="signInForm"
              onSubmit={this.props.onSubmitSignIn(
                this.state.email,
                this.state.password
              )}
            >
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="email">
                    Email address
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={e => this.onEmailChange(e)}
                      placeholder="you@example.com"
                      required
                      type="email"
                      value={this.state.email}
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Password
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={e => this.onPasswordChange(e)}
                      placeholder="password"
                      required
                      type="password"
                      value={this.state.password}
                    />
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-btn modal-btn-primary" type="submit">
                  Sign In
                </button>
                <button
                  className="modal-btn modal-btn-default"
                  onClick={() => this.handleModalClose()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </React.Fragment>
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
)(ModalSignIn);
