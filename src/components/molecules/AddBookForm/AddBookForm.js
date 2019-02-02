import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as options from '../../../utils/formOptions';
import * as formValidation from '../../../utils/formValidation';

import './AddBookForm.scss';

const AddBookForm = ({ booksState, handleModalClose, members, submitForm }) => {
  return (
    <Formik
      initialValues={{
        author: '',
        amazonUrl: '',
        datePickedMonth: 'January',
        datePickedYear: new Date().getFullYear(),
        subtitle: '',
        title: '',
        userPicked: '',
      }}
      onSubmit={(values, actions) => {
        submitForm(values);

        // actions.setSubmitting(false);

        if (!booksState.addingBook && !booksState.failedToAddBook) {
          actions.resetForm();

          handleModalClose();
        }
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <Form className="AddBookForm">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <Field className="form-control" name="title" type="text" validate={formValidation.required} />
            <ErrorMessage className="error" name="title" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <Field className="form-control" name="subtitle" type="text" />
            <ErrorMessage className="error" name="subtitle" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author*</label>
            <Field className="form-control" name="author" type="text" validate={formValidation.required} />
            <ErrorMessage className="error" name="author" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="amazonUrl">Amazon Link</label>
            <Field
              className="form-control"
              name="amazonUrl"
              placeholder=""
              type="text"
              validate={formValidation.link}
            />
            <ErrorMessage className="error" name="amazonUrl" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="userPicked">Picked By*</label>
            <Field component="select" className="form-control" name="userPicked" validate={formValidation.required}>
              {options.members(members)}
            </Field>
            <ErrorMessage className="error" name="userPicked" component="div" />
          </div>

          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="datePickedMonth">Date Picked</label>
              <Field
                component="select"
                className="form-control"
                name="datePickedMonth"
                validate={formValidation.required}
              >
                {options.months}
              </Field>
              <ErrorMessage className="error" name="datePickedMonth" component="div" />
            </div>

            <div className="form-group col-6 d-flex align-items-end">
              <Field component="select" className="form-control" name="datePickedYear">
                {options.years}
              </Field>
              <ErrorMessage className="error" name="datePickedYear" component="div" />
            </div>
          </div>

          <div className="form-group last">
            <button className="modal-btn modal-btn-primary" disabled={isSubmitting} type="submit">
              Add Book
            </button>

            <button className="modal-btn modal-btn-secondary" onClick={() => handleModalClose()} type="button">
              Cancel
            </button>
          </div>
        </Form>
      )}
    />
  );
};

export default AddBookForm;
