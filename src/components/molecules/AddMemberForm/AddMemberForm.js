import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as authActions from '../../../store/actions/auth';
import * as formValidation from '../../../utils/formValidation';

import './AddMemberForm.scss';

const MED_PASSWORD = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

class AddMemberForm extends Component {
  state = {
    passwordBorder: 'border',
    passwordInputType: 'password',
    passwordShowHide: 'Show',
    passwordStrength: 0,
  };

  handlePasswordEvent(event, field, errors) {
    if (event.type === 'input') {
      field.onChange(event);
    } else if (event.type === 'blur') {
      field.onBlur(event);
    }

    if (field.value.length > 0 && !errors.password) {
      if (STRONG_PASSWORD.test(field.value)) {
        this.setState({
          passwordBorder: 'border border-success',
          passwordStrength: 3,
        });
      } else if (MED_PASSWORD.test(field.value)) {
        this.setState({
          passwordBorder: 'border border-warning',
          passwordStrength: 2,
        });
      } else {
        this.setState({
          passwordBorder: 'border border-danger',
          passwordStrength: 1,
        });
      }
    } else {
      this.setState({
        passwordBorder: 'border',
        passwordStrength: 0,
      });
    }

    this.setState({ passwordBorder: 'border' });
  }

  handlePasswordToggle() {
    if (this.state.passwordInputType === 'password') {
      this.setState({ passwordInputType: 'text', passwordShowHide: 'Hide' });
    } else if (this.state.passwordInputType === 'text') {
      this.setState({
        passwordInputType: 'password',
        passwordShowHide: 'Show',
      });
    }
  }

  render() {
    let passwordStrengthIndicator;

    if (this.state.passwordStrength === 0) {
      passwordStrengthIndicator = null;
    } else if (this.state.passwordStrength === 1) {
      passwordStrengthIndicator = (
        <small className="form-text text-danger">Password Strength: Poor</small>
      );
    } else if (this.state.passwordStrength === 2) {
      passwordStrengthIndicator = (
        <small className="form-text text-warning">Password Stength: Good</small>
      );
    } else if (this.state.passwordStrength === 3) {
      passwordStrengthIndicator = (
        <small className="form-text text-success">
          Password Strength: Great
        </small>
      );
    }

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          nameFirst: '',
          nameLast: '',
        }}
        onSubmit={(values, actions) => {
          this.props.onAddMemberSubmission(values);
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form className="AddMemberForm">
            <div className="form-group">
              <em>All fields are required</em>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field
                className="form-control"
                name="email"
                type="text"
                validate={formValidation.email}
              />
              <ErrorMessage
                className="error form-text"
                name="email"
                component="small"
              />
            </div>

            <div className="form-group">
              <div className="password-group">
                <label htmlFor="password">Password</label>
                <button
                  className="btn btn-link"
                  onClick={() => this.handlePasswordToggle()}
                  type="button"
                >
                  {`${this.state.passwordShowHide} Password`}
                </button>
              </div>
              <Field
                name="password"
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      className={`form-control ${this.state.passwordBorder}`}
                      onBlur={() =>
                        //eslint-disable-next-line
                        this.handlePasswordEvent(event, field, errors)
                      }
                      onChange={() =>
                        //eslint-disable-next-line
                        this.handlePasswordEvent(event, field, errors)
                      }
                      type={this.state.passwordInputType}
                    />
                    <ErrorMessage
                      className="error form-text"
                      name="password"
                      component="small"
                    />
                    {passwordStrengthIndicator}
                  </>
                )}
                validate={formValidation.password}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nameFirst">First Name</label>
              <Field
                className="form-control"
                name="nameFirst"
                type="text"
                validate={formValidation.required}
              />
              <ErrorMessage
                className="error form-text"
                name="nameFirst"
                component="small"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nameLast">Last Name</label>
              <Field
                className="form-control"
                name="nameLast"
                type="text"
                validate={formValidation.required}
              />
              <ErrorMessage
                className="error form-text"
                name="nameLast"
                component="small"
              />
            </div>

            <div className="form-group last">
              <button
                className="modal-btn modal-btn-primary"
                disabled={isSubmitting}
                type="submit"
              >
                Register
              </button>

              <button
                className="modal-btn modal-btn-secondary"
                onClick={() => this.props.handleModalClose()}
                type="button"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      />
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
    onAddMemberSubmission: values => dispatch(authActions.addUser(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberForm);
