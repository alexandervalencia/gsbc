import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './BookInfo.scss';

const BookInfo = ({ author, datePicked, subtitle, title }) => {
  const date = format(datePicked, 'MMMM YYYY');

  return (
    <>
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle ? `${subtitle}` : null}</h2>
      <h3 className="author">
        by <span className="author-name">{author}</span>
      </h3>
      <p className="date-read">
        read on <strong>{date}</strong>
      </p>
    </>
  );
};

BookInfo.propTypes = {
  author: PropTypes.string,
  datePicked: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BookInfo;
