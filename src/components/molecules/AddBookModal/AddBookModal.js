import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import * as booksActions from '../../../store/actions/books';
import { AddBookForm, TimesIcon } from 'components';

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

  render() {
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={() => this.handleModalOpen()}
        >
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

              <button
                aria-label="Close"
                className="close"
                onClick={() => this.handleModalClose()}
              >
                <TimesIcon />
              </button>
            </div>

            <AddBookForm
              booksState={this.props.booksState}
              handleModalClose={() => this.handleModalClose()}
              members={this.props.membersState.members}
              submitForm={values => this.props.onAddBookSubmission(values)}
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

const mapDispatchToProps = dispatch => {
  return {
    onAddBookSubmission: values => dispatch(booksActions.addBook(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBookModal);
