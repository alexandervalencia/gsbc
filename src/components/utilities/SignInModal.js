import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

const SignInModal = ({ email, handleModalClose, handleSignIn, onEmailChange, onPasswordChange, password, showModal }) => {
  return (
    <ReactModal
      contentLabel="Sign In Modal"
      isOpen={showModal}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="signInModalLabel">Sign-In to GSBC</h5>

          <button aria-label="Close" className="close" onClick={handleModalClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form id="signInForm" onSubmit={handleSignIn}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="email">Email address
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={onEmailChange}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={onPasswordChange}
                  placeholder="password"
                  required
                  type="password"
                  value={password}
                />
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" type="submit">Sign In</button>
            <button className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
          </div>
        </form>
      </div>
    </ReactModal>
  )
}

SignInModal.propTypes = {
  email: PropTypes.string,
  handleModalClose: PropTypes.func,
  handleSignIn: PropTypes.func,
  onEmailChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  password: PropTypes.string,
  showModal: PropTypes.bool,
}

export default SignInModal
