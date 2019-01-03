import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as formValidation from '../../../utils/formValidation';

const SignInForm = ({ submitForm, handleModalClose }) => {
  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      onSubmit={(values, actions) => {
        submitForm(values.email, values.password);
        // actions.setSubmitting(false);
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Field
            className="form-control"
            name="email"
            placeholder="email"
            type="email"
            validate={formValidation.email}
          />
          <ErrorMessage name="email" component="div" />
          <Field
            name="password"
            placeholder="password"
            type="password"
            validate={formValidation.password}
          />
          <ErrorMessage name="password" component="div" />
          <button
            className="modal-btn modal-btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Sign In
          </button>
          <button
            className="modal-btn modal-btn-default"
            onClick={() => handleModalClose()}
            type="button"
          >
            Cancel
          </button>
        </Form>
      )}
    />
  );
};

export default SignInForm;
