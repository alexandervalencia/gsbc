import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import { Icon } from 'components';

import * as formValidation from '../../../utils/formValidation';
import { auth } from '../../../firebase';

const ForgotMyPasswordForm = ({ handleForgotPasswordCancel }) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values, actions) => {
        // submitForm(values.email);
        var emailAddress = values.email;

        auth
          .sendPasswordResetEmail(emailAddress)
          .then(() => {
            actions.resetForm();
            handleForgotPasswordCancel();
          })
          .catch(error => {
            actions.setFieldError(`email`, `Invalid email or server error.\nPlease try again.`);
            actions.resetForm({ email: emailAddress });
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
