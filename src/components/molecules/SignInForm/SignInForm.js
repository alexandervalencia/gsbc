import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';

import * as formValidation from '../../../utils/formValidation';

const SignInForm = ({ submitForm, handleForgotPassword, handleModalClose }) => {
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
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              className="form-control"
              name="password"
              placeholder="password"
              type="password"
              validate={formValidation.password}
            />
            <ErrorMessage className="form-text" name="password" component="div" />
            {/* <Button color="link" onClick={() => handleForgotPassword()} size="sm" type="button">
              Forgot My Password
            </Button> */}
          </div>
          <Button color="primary" disabled={isSubmitting} type="submit">
            Sign In
          </Button>{' '}
          <Button className="secondary" onClick={() => handleModalClose()} type="button">
            Cancel
          </Button>
        </Form>
      )}
    />
  );
};

export default SignInForm;
