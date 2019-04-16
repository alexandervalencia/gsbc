import React, { Component } from 'react';

import ReactModal from 'react-modal';

import { AddBookForm, Icon } from 'components';
import { newBookConfig } from '../../../utils/newBookConfig';

import './AddBookModal.css';

ReactModal.setAppElement('#root');

class AddBookModal extends Component {
  state = {
    showModal: false,
  };

  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalOpen() {
    this.setState({ showModal: true });
  }

  handleSubmit(values) {
    let newBook = newBookConfig(values);
  }

  render() {
    return (
      <>
        <button className="btn btn-primary" onClick={() => this.handleModalOpen()}>
          Add Book
        </button>

        <ReactModal
          contentLabel="Add Book Modal"
          isOpen={this.state.showModal}
          style={{
            /* stylelint-disable-next-line */
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            /* stylelint-disable-next-line */
            content: {
              bottom: '10%',
              left: '20%',
              right: '20%',
              top: '10%',
            },
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="signInModalLabel">
                Add a Book to the Bookcase
              </h3>

              <button aria-label="Close" className="close" onClick={() => this.handleModalClose()}>
                <Icon name="times" />
              </button>
            </div>

            {/* <AddBookForm
              booksState={this.props.booksState}
              handleModalClose={() => this.handleModalClose()}
              members={this.props.membersState.members}
              submitForm={this.handleSubmit}
            /> */}
          </div>
        </ReactModal>
      </>
    );
  }
}

export default AddBookModal;
