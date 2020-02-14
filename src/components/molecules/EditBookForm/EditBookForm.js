import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';

import { BookCover } from 'components';
import { auth } from '../../../firebase';

import * as formValidation from '../../../utils/formValidation';
import { newBookConfig } from '../../../utils/newBookConfig';
import UploadThumbnail from '../UploadThumbnail/UploadThumbnail';

export const EditBookForm = ({ book, handleModalClose }) => {
  const { amazonUrl, author, coverImg, datePicked, id, title, subtitle, userPicked } = book;

  const handleFileUpload = event => {
    let validate = formValidation.required;
  };

  const handleSubmit = values => {
    let newBook = newBookConfig(values);
  };

  return (
    <Formik
      initialValues={{
        amazonUrl,
        author,
        coverImg,
        datePicked,
        id,
        subtitle,
        title,
        userPicked,
      }}
      onSubmit={(values, actions) => {
        // actions.setStatus(undefined);
        // actions.setSubmitting(true);
        // auth
        //   .signInWithEmailAndPassword(values.email, values.password)
        //   .then(() => {
        //     actions.resetForm();
        //     actions.setSubmitting(false);
        //     handleModalClose();
        //   })
        //   .catch(error => {
        //     if (error.code === `auth/user-not-found`) {
        //       actions.setStatus({ email: `Incorrect email address or unregistered user.` });
        //     } else if (error.code === `auth/wrong-password`) {
        //       actions.setStatus({ password: `Incorrect password, please try again` });
        //     }
        //     actions.setSubmitting(false);
        //   });
      }}
      render={({ errors, isSubmitting, setFieldValue, status, touched, values }) => (
        <Form>
          {values.coverImg ? <UploadThumbnail file={values.coverImg} /> : '❌📖 No current cover'}

          <div className="form-group">
            <label htmlFor="coverImg">Book Cover</label>
            <input
              className="form-control"
              id="coverImg"
              name="coverImg"
              onChange={event => setFieldValue('coverImg', event.currentTarget.files[0])}
              type="file"
            />
            <ErrorMessage className="form-text" name="coverImg" component="div" />
          </div>
          {status && status.coverImg && <div className="mb-3 text-danger">{status.coverImg}</div>}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field className="form-control" name="title" placeholder="title" type="text" />
            <ErrorMessage className="form-text" name="title" component="div" />
          </div>
          {status && status.title && <div className="mb-3 text-danger">{status.title}</div>}
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <Field className="form-control" name="subtitle" placeholder="subtitle" type="text" />
            <ErrorMessage className="form-text" name="subtitle" component="div" />
          </div>
          {status && status.subtitle && <div className="mb-3 text-danger">{status.subtitle}</div>}
          {/* <Button color="primary" disabled={isSubmitting} type="submit">
            Save Updates
          </Button>{' '}
          <Button className="secondary" onClick={() => handleModalClose()} type="button">
            Cancel
          </Button> */}
        </Form>
      )}
    />
  );
};

export default EditBookForm;
