import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import './BookInfo.scss';

const BookInfo = ({ author, bookId, datePicked, subtitle, title }) => {
  const date = format(datePicked, 'MMMM YYYY');

  const bookTitle = bookId ? (
    <Link to={`/books/${bookId}`}>
      <h1 className="title">{title}</h1>
    </Link>
  ) : (
    <h1 className="title">{title}</h1>
  );

  return (
    <div className="BookInfo">
      {bookTitle}
      {subtitle ? <h2 className="subtitle">{subtitle}</h2> : null}
      <h3 className="author">
        by <span className="author-name">{author}</span>
      </h3>
      <p className="date-read">
        read on <strong>{date}</strong>
      </p>
    </div>
  );
};

BookInfo.propTypes = {
  author: PropTypes.string,
  datePicked: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BookInfo;
