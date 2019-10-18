import React, { useState } from 'react';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { EditBookForm } from 'components';
import './EditBookModal.scss';

const EditBookModal = ({ book }) => {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Button color="primary" onClick={toggleModal}>
        Edit Book
      </Button>

      <Modal isOpen={showModal} toggle={toggleModal} className="">
        <ModalHeader toggle={toggleModal}>Edit {book.title}</ModalHeader>
        <ModalBody>
          <EditBookForm book={book} handleModalClose={toggleModal} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Save Updates
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditBookModal;
