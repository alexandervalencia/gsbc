import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './BookInfo.css';

const BookInfo = ({ author, datePicked, subtitle, title }) => {
  const date = format(datePicked, 'MMMM YYYY');

  return (
    <div className="BookInfo">
      {subtitle ? (
        <h1 className="title">
          {title}: <span className="subtitle">{subtitle}</span>
        </h1>
      ) : (
        <h1 className="title">{title}</h1>
      )}
      <h2 className="author">{author}</h2>
      <p className="date-read">{date}</p>
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
