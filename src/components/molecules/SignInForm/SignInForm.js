import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { auth } from '../../../firebase';

import * as formValidation from '../../../utils/formValidation';

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      onSubmit={(values, actions) => {
        actions.setStatus(undefined);
        actions.setSubmitting(true);

        auth
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            actions.resetForm();
            actions.setSubmitting(false);
          })
          .catch(error => {
            if (error.code === `auth/user-not-found`) {
              actions.setStatus({ email: `Incorrect email address or unregistered user.` });
            } else if (error.code === `auth/wrong-password`) {
              actions.setStatus({ password: `Incorrect password, please try again` });
            }

            actions.setSubmitting(false);
          });
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
          {status && status.email && <div className="mb-3 text-danger">{status.email}</div>}
          <div className="form-group">
            <label className="d-flex" htmlFor="password">
              Password
              <Link className="ml-auto" to="/reset_password">
                Forgot My Password
              </Link>
            </label>
            <Field
              className="form-control"
              name="password"
              placeholder="password"
              type="password"
              validate={formValidation.password}
            />
            <ErrorMessage className="form-text" name="password" component="div" />
          </div>
          {status && status.password && <div className="mb-3 text-danger">{status.password}</div>}
          <Button color="primary" disabled={isSubmitting} type="submit">
            Sign In
          </Button>
        </Form>
      )}
    />
  );
};

export default SignInForm;
