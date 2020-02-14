import React, { useState } from 'react';
import ReactModal from 'react-modal';

import { ForgotMyPasswordForm, SignInForm, Icon } from 'components';
// import { signInWithGoogle } from '../../../firebase';

ReactModal.setAppElement('#root');

const SignInModal = () => {
  const [formType, setFormType] = useState('sign-in');
  const [showModal, setShowModal] = useState(false);

  const handleForgotPasswordCancel = () => {
    setFormType('sign-in');
  };

  const handleForgotPassword = () => {
    setFormType('forgotPassword');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  let form =
    formType === 'sign-in' ? (
      <SignInForm handleModalClose={handleModalClose} handleForgotPassword={handleForgotPassword} />
    ) : (
      <ForgotMyPasswordForm handleForgotPasswordCancel={handleForgotPasswordCancel} />
    );

  return (
    <>
      <button className="btn btn-primary" onClick={handleModalOpen}>
        Sign In
      </button>

      <ReactModal
        contentLabel="Sign In Modal"
        isOpen={showModal}
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

            <button aria-label="Close" className="close" onClick={handleModalClose}>
              <Icon name="times" />
            </button>
          </div>

          <div className="modal-body">{form}</div>
        </div>
      </ReactModal>
    </>
  );
};

export default SignInModal;
