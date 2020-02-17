import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { Icon } from 'components';

import * as formValidation from '../../../utils/formValidation';
import { auth } from '../../../firebase';

const ForgotMyPasswordForm = ({ handleForgotPasswordCancel }) => {
  const [redirectOnSubmit, setRedirectOnSubmit] = useState(false);
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values, actions) => {
        var emailAddress = values.email;

        auth
          .sendPasswordResetEmail(emailAddress)
          .then(() => {
            actions.resetForm();
            setRedirectOnSubmit(true);
          })
          .catch(error => {
            actions.setFieldError(`email`, `Invalid email address. Please try again.`);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting }) => (
        <Form>
          <div className="text-center">
            <Icon name="lock" size="5" />
            <h3>Forget Your Password?</h3>
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
            Send password reset email
          </Button>
          {redirectOnSubmit && <Redirect to="/login" />}
        </Form>
      )}
    />
  );
};

export default ForgotMyPasswordForm;
