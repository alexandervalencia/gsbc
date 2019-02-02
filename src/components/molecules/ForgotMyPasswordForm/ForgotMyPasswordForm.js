import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import { Icon } from 'components';

import * as formValidation from '../../../utils/formValidation';

const ForgotMyPasswordForm = ({ submitForm, handleForgotPasswordCancel }) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={values => {
        submitForm(values.email);
        handleForgotPasswordCancel();
      }}
      render={({ isSubmitting }) => (
        <Form>
          <div className="text-center">
            <Icon name="lock" size="5" />
            <h3>Forgot Password?</h3>
            <p>You can reset your password here.</p>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              className="form-control"
              name="email"
              placeholder="email"
              type="email"
              validate={formValidation.email}
            />
            <ErrorMessage className="form-text" name="email" component="div" />
          </div>
          <Button block color="primary" disabled={isSubmitting} size="lg" type="submit">
            Reset Password
          </Button>
          <Button block className="secondary" onClick={() => handleForgotPasswordCancel()} size="lg" type="button">
            Cancel
          </Button>
        </Form>
      )}
    />
  );
};

export default ForgotMyPasswordForm;
