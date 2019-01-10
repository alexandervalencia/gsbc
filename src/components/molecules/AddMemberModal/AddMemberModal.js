import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { AddMemberForm, TimesIcon } from 'components';

import './AddMemberModal.css';

ReactModal.setAppElement('#root');

class AddMemberModal extends Component {
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
          Sign Up
        </button>

        <ReactModal
          contentLabel="Registration Modal"
          isOpen={this.state.showModal}
          style={{
            /* stylelint-disable-next-line */
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            /* stylelint-disable-next-line */
            content: {
              bottom: '10%',
              left: '50%',
              right: 'auto',
              top: '10%',
              transform: 'translateX(-50%)',
              maxWidth: '800px',
              minWidth: '300px',
            },
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="signInModalLabel">
                Register as a Member of the Good Stuff Book Club
              </h3>

              <button
                aria-label="Close"
                className="close"
                onClick={() => this.handleModalClose()}
              >
                <TimesIcon />
              </button>
            </div>

            <AddMemberForm
              booksState={this.props.booksState}
              handleModalClose={() => this.handleModalClose()}
              members={this.props.membersState.members}
            />
          </div>
        </ReactModal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    booksState: state.books,
    membersState: state.members,
  };
};

export default connect(mapStateToProps)(AddMemberModal);
