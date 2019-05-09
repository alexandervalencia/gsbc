import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import './BookInfo.scss';

const BookInfo = ({ author, datePicked, subtitle, title }) => {
  const date = format(datePicked, 'MMMM YYYY');

  return (
    <div className="BookInfo">
      <h1 className="title">{title}</h1>
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
