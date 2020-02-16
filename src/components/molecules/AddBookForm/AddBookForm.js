import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { format } from 'date-fns';
import { Redirect } from 'react-router-dom';

import { firestore } from '../../../firebase';
import { UsersContext } from '../../../providers/UsersProvider';
import * as options from '../../../utils/formOptions';
import { newBookConfig } from '../../../utils/booksUtils';
import * as formValidation from '../../../utils/formValidation';

import './AddBookForm.scss';

const AddBookForm = () => {
  const users = useContext(UsersContext);
  const [redirectOnSubmit, setRedirectOnSubmit] = useState(false);

  return (
    <Formik
      initialValues={{
        author: '',
        amazonUrl: '',
        datePickedMonth: format(new Date(), 'MMMM'),
        datePickedYear: new Date().getFullYear(),
        subtitle: '',
        title: '',
        userPicked: '',
      }}
      onSubmit={values => {
        const book = newBookConfig(values);

        firestore
          .collection('books')
          .add(book)
          .then(() => setRedirectOnSubmit(true));
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
              {options.users(users)}
            </Field>
            <ErrorMessage className="error" name="userPicked" component="div" />
          </div>

          <div className="form-row">
            <div className="form-group col">
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

            <div className="form-group col d-flex align-items-end">
              <Field component="select" className="form-control" name="datePickedYear">
                {options.years}
              </Field>
              <ErrorMessage className="error" name="datePickedYear" component="div" />
            </div>
          </div>

          <div className="form-group last">
            <button className="btn btn-primary" disabled={isSubmitting} type="submit">
              Add Book
            </button>
          </div>
          {redirectOnSubmit && <Redirect to="/" />}
        </Form>
      )}
    />
  );
};

export default AddBookForm;
